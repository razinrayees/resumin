import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Edit, ExternalLink, Copy, LogOut, Eye, Share2, BarChart3, Lock, Globe, QrCode, ChevronDown, ChevronUp, MessageCircle, Plus, Trash2, Crown, AlertTriangle, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { db } from '../lib/firebase';
import { UserProfile } from '../types/user';
import { QRCodeGenerator } from '../components/QRCodeGenerator';
import { TestimonialManager } from '../components/TestimonialManager';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { generateQRCode } from '../utils/qrGenerator';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const { currentUser, logout, hasProfile } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [qrLoading, setQrLoading] = useState(false);
  const [showTestimonialManager, setShowTestimonialManager] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'settings'>('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const generateQR = async () => {
    if (!profile) return;
    
    setQrLoading(true);
    try {
      const profileUrl = `https://resumin.link/${profile.username}`;
      const dataURL = await generateQRCode(profileUrl, {
        size: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
      setQrCodeDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setQrLoading(false);
    }
  };

  const handleShowQRCode = async () => {
    if (!showQRCode && !qrCodeDataURL) {
      await generateQR();
    }
    setShowQRCode(!showQRCode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const copyProfileLink = () => {
    if (profile) {
      const link = `https://resumin.link/${profile.username}`;
      navigator.clipboard.writeText(link);
      toast.success('Profile link copied to clipboard!');
    }
  };

  const toggleProfileVisibility = async () => {
    if (!profile || !currentUser) return;

    try {
      const newVisibility = !profile.isPublic;
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, { isPublic: newVisibility });
      
      setProfile(prev => prev ? { ...prev, isPublic: newVisibility } : null);
      toast.success(`Profile is now ${newVisibility ? 'public' : 'private'}`);
    } catch (error) {
      console.error('Error updating profile visibility:', error);
      toast.error('Error updating profile visibility');
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser || !profile) return;
    
    if (deleteConfirmText !== profile.username) {
      toast.error('Please type your username correctly to confirm deletion');
      return;
    }

    setIsDeleting(true);
    
    try {
      // Delete user profile from Firestore
      const userDoc = doc(db, 'users', currentUser.uid);
      await deleteDoc(userDoc);
      
      // Delete the user account from Firebase Auth
      await deleteUser(currentUser);
      
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please log out and log back in, then try deleting your account again');
      } else {
        toast.error('Error deleting account. Please try again or contact support.');
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  const handleUpgradeToPro = () => {
    // Navigate to pricing page with upgrade intent
    navigate('/pricing?upgrade=true');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // If user doesn't have a profile, show create profile prompt
  if (!hasProfile || !profile) {
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
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
                >
                  <LogOut size={16} className="mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={32} className="text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Resumin!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Let's create your professional resume profile. It only takes a few minutes to get started.
            </p>
            <Link
              to="/create-profile"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <Plus size={20} className="mr-2" />
              Create Your Profile
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              You'll get your personalized link: resumin.link/yourname
            </p>
          </div>
        </div>
      </div>
    );
  }

  const profileUrl = `https://resumin.link/${profile.username}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Testimonial Manager */}
      <TestimonialManager
        isVisible={showTestimonialManager}
        onToggle={() => setShowTestimonialManager(!showTestimonialManager)}
      />

      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">R</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Resumin</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
              >
                <LogOut size={16} className="mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-8">
              <div className="text-center mb-4 sm:mb-6">
                {/* Profile Picture or Initials */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg mx-auto mb-4">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt={profile.name || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500 ${profile.profilePicture ? 'hidden' : ''}`}>
                    <span className="text-lg sm:text-2xl font-bold text-white">
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{profile.title}</p>
                
                {/* Privacy Status */}
                <div className="mt-3">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    profile.isPublic 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {profile.isPublic ? (
                      <>
                        <Globe size={12} className="mr-1" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock size={12} className="mr-1" />
                        Private
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Your Profile URL</h3>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <code className="flex-1 text-xs sm:text-sm text-gray-600 truncate">
                      resumin.link/{profile.username}
                    </code>
                    <button
                      onClick={copyProfileLink}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                      title="Copy link"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {profile.isPublic && (
                    <Link
                      to={`/${profile.username}`}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all text-sm sm:text-base"
                    >
                      <Eye size={16} className="mr-2" />
                      Preview Resume
                    </Link>
                  )}
                  
                  <button
                    onClick={toggleProfileVisibility}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      profile.isPublic
                        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {profile.isPublic ? (
                      <>
                        <Lock size={16} className="mr-2" />
                        Make Private
                      </>
                    ) : (
                      <>
                        <Globe size={16} className="mr-2" />
                        Make Public
                      </>
                    )}
                  </button>
                  
                  <Link
                    to="/create-profile"
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Resume
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Privacy Notice */}
            {!profile.isPublic && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <Lock size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-1">Your Profile is Private</h3>
                    <p className="text-yellow-700 text-sm mb-3">
                      Your profile is currently set to private and is not accessible via the public link. 
                      Only you can view it when logged in.
                    </p>
                    <button
                      onClick={toggleProfileVisibility}
                      className="text-sm bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Make Public
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <BarChart3 size={16} />
                    <span>Analytics</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Settings
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' ? (
                <>
                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Share2 size={20} className="text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Share Resume</h3>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mb-4">Share your professional profile with potential employers</p>
                      <button
                        onClick={copyProfileLink}
                        disabled={!profile.isPublic}
                        className={`w-full px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                          profile.isPublic
                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {profile.isPublic ? 'Copy Link' : 'Make Public First'}
                      </button>
                    </div>

                    {/* QR Code Component - Fixed to not expand others */}
                    {profile.isPublic && (
                      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <QrCode size={20} className="text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">QR Code</h3>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mb-4">
                            Share your resume instantly with a QR code
                          </p>
                          
                          <button
                            onClick={handleShowQRCode}
                            className="w-full flex items-center justify-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-xs sm:text-sm font-medium"
                          >
                            {showQRCode ? (
                              <>
                                <ChevronUp size={16} className="mr-1" />
                                Hide QR Code
                              </>
                            ) : (
                              <>
                                <ChevronDown size={16} className="mr-1" />
                                Show QR Code
                              </>
                            )}
                          </button>
                        </div>

                        {/* Collapsible QR Code Content - Fixed positioning */}
                        {showQRCode && (
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
                            <div className="pt-4 flex justify-center">
                              {qrLoading ? (
                                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                </div>
                              ) : qrCodeDataURL ? (
                                <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
                                  <img
                                    src={qrCodeDataURL}
                                    alt="QR Code for profile"
                                    className="w-32 h-32 sm:w-40 sm:h-40"
                                  />
                                </div>
                              ) : (
                                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <span className="text-gray-500 text-sm">Failed to load</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MessageCircle size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Testimonials</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Manage testimonials from colleagues and clients</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTestimonialManager(!showTestimonialManager)}
                        className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                      >
                        <MessageCircle size={16} />
                        <span>{showTestimonialManager ? 'Close' : 'Open'} Manager</span>
                      </button>
                    </div>
                  </div>

                  {/* Profile Overview */}
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Overview</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-4 sm:space-y-6">
                        {profile.bio && (
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">About</h4>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{profile.bio}</p>
                          </div>
                        )}

                        {profile.skills.length > 0 && (
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.skills.slice(0, 8).map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium"
                                >
                                  {typeof skill === 'string' ? skill : skill.name}
                                </span>
                              ))}
                              {profile.skills.length > 8 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
                                  +{profile.skills.length - 8} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        {profile.experience.length > 0 && (
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Recent Experience</h4>
                            <div className="space-y-4">
                              {profile.experience.slice(0, 2).map((exp, index) => (
                                <div key={index} className="border-l-2 border-orange-200 pl-4">
                                  <h5 className="font-medium text-gray-900 text-sm sm:text-base">{exp.role}</h5>
                                  <p className="text-orange-600 text-xs sm:text-sm font-medium">{exp.company}</p>
                                  <p className="text-gray-500 text-xs sm:text-sm">{exp.duration}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {profile.education.length > 0 && (
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Education</h4>
                            <div className="space-y-3">
                              {profile.education.slice(0, 2).map((edu, index) => (
                                <div key={index}>
                                  <h5 className="font-medium text-gray-900 text-sm sm:text-base">{edu.degree}</h5>
                                  <p className="text-gray-600 text-xs sm:text-sm">{edu.institution}</p>
                                  <p className="text-gray-500 text-xs sm:text-sm">{edu.year}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Profile completed • Last updated: {new Date().toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${profile.isPublic ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className={`text-xs sm:text-sm font-medium ${profile.isPublic ? 'text-green-600' : 'text-gray-500'}`}>
                            {profile.isPublic ? 'Live' : 'Private'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : activeTab === 'analytics' ? (
                /* Analytics Tab */
                <AnalyticsDashboard 
                  profileId={currentUser?.uid || ''} 
                  username={profile.username} 
                />
              ) : (
                /* Settings Tab */
                <div className="space-y-6">
                  {/* Upgrade to Pro Section */}
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Crown size={24} className="text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade to Pro</h3>
                        <p className="text-gray-600 mb-4">
                          Unlock advanced features like custom domains, PDF export, advanced analytics, and priority support.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Custom Domain</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">PDF Export</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Advanced Analytics</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Priority Support</span>
                        </div>
                        <button
                          onClick={handleUpgradeToPro}
                          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all font-semibold"
                        >
                          <Crown size={16} />
                          <span>Upgrade to Pro</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Account Email</h4>
                          <p className="text-sm text-gray-600">{currentUser?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Username</h4>
                          <p className="text-sm text-gray-600">@{profile.username}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Account Type</h4>
                          <p className="text-sm text-gray-600">Free Plan</p>
                        </div>
                        <button
                          onClick={handleUpgradeToPro}
                          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                        >
                          <CreditCard size={14} />
                          <span>Upgrade</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
                        <p className="text-red-800 text-sm mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          <Trash2 size={14} />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                This will permanently delete your account, profile, and all associated data. 
                Your username will become available for others to use.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 text-sm font-medium mb-2">
                  To confirm deletion, type your username: <code className="bg-red-100 px-1 rounded">{profile.username}</code>
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Type your username here"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmText !== profile.username}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};