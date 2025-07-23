import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, ExternalLink, Github, Linkedin, Globe, MapPin, Phone, Calendar, Award, Languages, Star, Instagram, Twitter, Lock, User, Download, Share2, Heart, MessageCircle, Send, Check, X, Plus } from 'lucide-react';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile, SkillWithLevel, DEFAULT_LAYOUT } from '../types/user';
import { CustomizableResumePreview } from '../components/CustomizableResumePreview';
import { trackEvent, trackPageView } from '../utils/analytics';
import toast from 'react-hot-toast';

interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  authorEmail: string;
  content: string;
  rating: number;
  createdAt: string;
  approved: boolean;
}

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showTestimonialPage, setShowTestimonialPage] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    authorName: '',
    authorTitle: '',
    authorEmail: '',
    content: '',
    rating: 5
  });
  const [submittingTestimonial, setSubmittingTestimonial] = useState(false);
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [profileUserId, setProfileUserId] = useState<string>('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;

      try {
        const usersQuery = query(
          collection(db, 'users'),
          where('username', '==', username.toLowerCase())
        );
        
        const querySnapshot = await getDocs(usersQuery);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as UserProfile;
          const userId = userDoc.id;
          
          setProfileUserId(userId);
          
          // Check if current user is the profile owner
          if (currentUser && userId === currentUser.uid) {
            setIsProfileOwner(true);
          }
          
          // Check if profile is private
          if (userData.isPublic === false) {
            setIsPrivate(true);
          } else {
            // Ensure layout exists, use default if not
            const profileWithLayout = {
              ...userData,
              layout: userData.layout || DEFAULT_LAYOUT
            };
            setProfile(profileWithLayout);
            await loadTestimonials(userId);
            
            // Track page view for analytics (only for non-owners)
            if (!currentUser || userId !== currentUser.uid) {
              const cleanup = await trackPageView(userId, username);
              
              // Cleanup function will be called when component unmounts
              return cleanup;
            }
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username, currentUser]);

  const loadTestimonials = async (userId: string) => {
    try {
      const testimonialsQuery = query(
        collection(db, 'testimonials'),
        where('profileUserId', '==', userId),
        where('approved', '==', true)
      );
      
      const querySnapshot = await getDocs(testimonialsQuery);
      const approvedTestimonials = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];

      setTestimonials(approvedTestimonials);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!testimonialForm.authorName.trim() || !testimonialForm.content.trim() || !testimonialForm.authorEmail.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testimonialForm.authorEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubmittingTestimonial(true);

    try {
      await addDoc(collection(db, 'testimonials'), {
        profileUserId,
        authorId: currentUser?.uid || null,
        authorName: testimonialForm.authorName.trim(),
        authorTitle: testimonialForm.authorTitle.trim(),
        authorEmail: testimonialForm.authorEmail.trim(),
        content: testimonialForm.content.trim(),
        rating: testimonialForm.rating,
        createdAt: new Date().toISOString(),
        approved: false
      });

      // Track testimonial submission
      if (profile) {
        await trackEvent(profileUserId, profile.username, 'testimonial_view', {
          action: 'submit'
        });
      }

      toast.success('Testimonial submitted! It will appear after approval.');
      setShowTestimonialForm(false);
      setShowTestimonialPage(false);
      setTestimonialForm({
        authorName: '',
        authorTitle: '',
        authorEmail: '',
        content: '',
        rating: 5
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit testimonial. Please try again.');
    } finally {
      setSubmittingTestimonial(false);
    }
  };

  const openTestimonialForm = () => {
    // Pre-fill email if user is logged in
    if (currentUser) {
      setTestimonialForm(prev => ({
        ...prev,
        authorEmail: currentUser.email || ''
      }));
    }
    setShowTestimonialForm(true);
  };

  const handleContactClick = async (type: 'email' | 'phone' | 'social', url?: string) => {
    if (profile && !isProfileOwner) {
      await trackEvent(profileUserId, profile.username, 'contact_click', {
        contactType: type,
        linkUrl: url
      });
    }
  };

  const handleLinkClick = async (url: string) => {
    if (profile && !isProfileOwner) {
      await trackEvent(profileUserId, profile.username, 'link_click', {
        linkUrl: url
      });
    }
  };

  const handleShare = async () => {
    const profileUrl = `https://resumin.link/${username}`;
    
    // Track share event
    if (profile && !isProfileOwner) {
      await trackEvent(profileUserId, profile.username, 'share_click');
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.name}'s Resume`,
          text: `Check out ${profile?.name}'s professional resume`,
          url: profileUrl,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(profileUrl);
        toast.success('Profile URL copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(profileUrl);
      toast.success('Profile URL copied to clipboard!');
    }
  };

  const handleDownload = async () => {
    // Track download event
    if (profile && !isProfileOwner) {
      await trackEvent(profileUserId, profile.username, 'download_click');
    }
    
    // This would trigger PDF generation in a real implementation
    toast.success('PDF download feature coming soon!');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (isPrivate) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <img 
                    src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/1logo.png" 
                    alt="Resumin Logo" 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain" 
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://resumin.link"
                  className="flex items-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  <Plus size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Create Your Profile</span>
                  <span className="sm:hidden">Create</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={24} className="text-gray-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Private Profile</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              This profile is set to private and is not publicly accessible.
            </p>
            <a
              href="https://resumin.link"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
            >
              Create Your Own Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <img 
                    src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/1logo.png" 
                    alt="Resumin Logo" 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain" 
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://resumin.link"
                  className="flex items-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  <Plus size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Create Your Profile</span>
                  <span className="sm:hidden">Create</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">Profile not found</p>
            <a
              href="https://resumin.link"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
            >
              Create Your Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img 
                  src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/1logo.png" 
                  alt="Resumin Logo" 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain" 
                  loading="lazy"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">{profile.name}</h1>
                <p className="text-sm text-gray-600">{profile.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Single Testimonials Button */}
              <button
                onClick={() => setShowTestimonialPage(true)}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm bg-blue-50 hover:bg-blue-100 rounded-lg"
                title="Testimonials"
              >
                <MessageCircle size={16} className="mr-1" />
                <span className="hidden sm:inline">
                  Testimonials {testimonials.length > 0 && `(${testimonials.length})`}
                </span>
                <span className="sm:hidden">
                  Reviews {testimonials.length > 0 && `(${testimonials.length})`}
                </span>
              </button>
              
              <a
                href="https://resumin.link"
                className="flex items-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                <Plus size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Create Your Profile</span>
                <span className="sm:hidden">Create</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          {/* Resume Content - Single white box container */}
          <div className="w-full max-w-4xl">
            <div id="resume-content" className="bg-white rounded-2xl shadow-xl font-inter">
              <CustomizableResumePreview 
                profile={profile} 
                layout={profile.layout || DEFAULT_LAYOUT} 
              />
            </div>
          </div>
        </div>

        {/* Testimonial Page Modal */}
        {showTestimonialPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Testimonials for {profile.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {testimonials.length > 0 ? `${testimonials.length} testimonial${testimonials.length > 1 ? 's' : ''}` : 'No testimonials yet'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTestimonialPage(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Write Testimonial Section */}
                {!isProfileOwner && (
                  <div className="mb-8">
                    {!showTestimonialForm ? (
                      <div className="text-center bg-blue-50 rounded-xl p-6">
                        <MessageCircle size={32} className="mx-auto text-blue-600 mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Share Your Experience</h4>
                        <p className="text-gray-600 mb-4">
                          Have you worked with {profile.name}? Share your experience to help others.
                        </p>
                        <button
                          onClick={() => setShowTestimonialForm(true)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Write a Testimonial
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Write a Testimonial</h4>
                        <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name *
                              </label>
                              <input
                                type="text"
                                value={testimonialForm.authorName}
                                onChange={(e) => setTestimonialForm(prev => ({ ...prev, authorName: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Your full name"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Email *
                              </label>
                              <input
                                type="email"
                                value={testimonialForm.authorEmail}
                                onChange={(e) => setTestimonialForm(prev => ({ ...prev, authorEmail: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="your.email@example.com"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Your Title/Position
                            </label>
                            <input
                              type="text"
                              value={testimonialForm.authorTitle}
                              onChange={(e) => setTestimonialForm(prev => ({ ...prev, authorTitle: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="e.g., Senior Developer at Company"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rating
                            </label>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setTestimonialForm(prev => ({ ...prev, rating }))}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    size={24}
                                    className={`${
                                      rating <= testimonialForm.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    } hover:text-yellow-400 transition-colors`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Testimonial *
                            </label>
                            <textarea
                              value={testimonialForm.content}
                              onChange={(e) => setTestimonialForm(prev => ({ ...prev, content: e.target.value }))}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Share your experience working with this person..."
                              required
                            />
                          </div>

                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={() => setShowTestimonialForm(false)}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={submittingTestimonial}
                              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                            >
                              <Send size={14} />
                              <span>{submittingTestimonial ? 'Submitting...' : 'Submit'}</span>
                            </button>
                          </div>
                        </form>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-800">
                            Your testimonial will be reviewed and published after approval by the profile owner.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Testimonials List */}
                {testimonials.length > 0 ? (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      What people say about {profile.name}
                    </h4>
                    <div className="grid gap-6">
                      {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-gray-900">{testimonial.authorName}</h5>
                                <div className="flex items-center">
                                  {renderStars(testimonial.rating)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{testimonial.authorTitle}</p>
                            </div>
                          </div>
                          <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                            "{testimonial.content}"
                          </blockquote>
                          <p className="text-xs text-gray-500">
                            {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  !showTestimonialForm && (
                    <div className="text-center py-12">
                      <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">No testimonials yet</h4>
                      <p className="text-gray-600">
                        Be the first to share your experience working with {profile.name}!
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 sm:p-8 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart size={24} className="mr-2" />
              <h3 className="text-xl sm:text-2xl font-bold">Create Your Own Professional Resume</h3>
            </div>
            <p className="text-orange-100 mb-6 text-sm sm:text-base">
              Build a beautiful, shareable resume like this one in just minutes. 
              Join thousands of professionals who use Resumin to showcase their skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://resumin.link"
                className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Get Started for Free
              </a>
              <button
                onClick={handleShare}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors text-sm sm:text-base"
              >
                Share This Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};