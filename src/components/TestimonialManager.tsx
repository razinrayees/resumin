import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, X, ChevronLeft, ChevronRight, Star, Eye, EyeOff } from 'lucide-react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
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

interface TestimonialManagerProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const TestimonialManager: React.FC<TestimonialManagerProps> = ({
  isVisible,
  onToggle
}) => {
  const { currentUser } = useAuth();
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>([]);
  const [approvedTestimonials, setApprovedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  useEffect(() => {
    if (currentUser && isVisible) {
      loadTestimonials();
    }
  }, [currentUser, isVisible]);

  const loadTestimonials = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const testimonialsQuery = query(
        collection(db, 'testimonials'),
        where('profileUserId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(testimonialsQuery);
      const allTestimonials = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];

      // Separate approved and pending testimonials
      const approved = allTestimonials.filter(t => t.approved);
      const pending = allTestimonials.filter(t => !t.approved);
      
      setApprovedTestimonials(approved);
      setPendingTestimonials(pending);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTestimonial = async (testimonialId: string) => {
    try {
      const testimonialRef = doc(db, 'testimonials', testimonialId);
      await updateDoc(testimonialRef, { approved: true });
      
      // Move from pending to approved
      const testimonial = pendingTestimonials.find(t => t.id === testimonialId);
      if (testimonial) {
        setPendingTestimonials(prev => prev.filter(t => t.id !== testimonialId));
        setApprovedTestimonials(prev => [...prev, { ...testimonial, approved: true }]);
      }
      
      toast.success('Testimonial approved!');
    } catch (error) {
      console.error('Error approving testimonial:', error);
      toast.error('Failed to approve testimonial');
    }
  };

  const handleRejectTestimonial = async (testimonialId: string) => {
    try {
      const testimonialRef = doc(db, 'testimonials', testimonialId);
      await deleteDoc(testimonialRef);
      
      // Remove from pending
      setPendingTestimonials(prev => prev.filter(t => t.id !== testimonialId));
      toast.success('Testimonial rejected and deleted');
    } catch (error) {
      console.error('Error rejecting testimonial:', error);
      toast.error('Failed to reject testimonial');
    }
  };

  const handleRemoveApproved = async (testimonialId: string) => {
    try {
      const testimonialRef = doc(db, 'testimonials', testimonialId);
      await deleteDoc(testimonialRef);
      
      // Remove from approved
      setApprovedTestimonials(prev => prev.filter(t => t.id !== testimonialId));
      toast.success('Testimonial removed');
    } catch (error) {
      console.error('Error removing testimonial:', error);
      toast.error('Failed to remove testimonial');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const totalPending = pendingTestimonials.length;
  const totalApproved = approvedTestimonials.length;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-white shadow-lg border border-gray-200 rounded-r-lg p-3 hover:bg-gray-50 transition-all duration-300 ${
          isVisible ? 'translate-x-80' : 'translate-x-0'
        }`}
        title="Toggle Testimonial Manager"
      >
        <div className="flex items-center space-x-2">
          {isVisible ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          <MessageCircle size={20} className="text-blue-600" />
          {totalPending > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalPending}
            </span>
          )}
        </div>
      </button>

      {/* Testimonial Manager Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl border-r border-gray-200 z-40 transform transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageCircle size={20} className="mr-2 text-blue-600" />
                Testimonials
              </h2>
              <button
                onClick={onToggle}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Close panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending
                {totalPending > 0 && (
                  <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {totalPending}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'approved'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Approved
                {totalApproved > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {totalApproved}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* Pending Testimonials */}
                {activeTab === 'pending' && (
                  <div className="space-y-4">
                    {pendingTestimonials.length > 0 ? (
                      pendingTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{testimonial.authorName}</h4>
                              <p className="text-xs text-gray-600 mb-1">{testimonial.authorTitle}</p>
                              <div className="flex items-center mb-2">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed mb-3">{testimonial.content}</p>
                          <p className="text-xs text-gray-500 mb-3">
                            From: {testimonial.authorEmail}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}
                          </p>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveTestimonial(testimonial.id)}
                              className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs"
                            >
                              <Check size={14} />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleRejectTestimonial(testimonial.id)}
                              className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs"
                            >
                              <X size={14} />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <MessageCircle size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600 text-sm">No pending testimonials</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Approved Testimonials */}
                {activeTab === 'approved' && (
                  <div className="space-y-4">
                    {approvedTestimonials.length > 0 ? (
                      approvedTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{testimonial.authorName}</h4>
                              <p className="text-xs text-gray-600 mb-1">{testimonial.authorTitle}</p>
                              <div className="flex items-center mb-2">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye size={14} className="text-green-600" />
                              <span className="text-xs text-green-600 font-medium">Live</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed mb-3">{testimonial.content}</p>
                          <p className="text-xs text-gray-500 mb-3">
                            Approved: {new Date(testimonial.createdAt).toLocaleDateString()}
                          </p>
                          
                          <button
                            onClick={() => handleRemoveApproved(testimonial.id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs"
                          >
                            <X size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <Check size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600 text-sm">No approved testimonials</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Total: {totalPending} pending, {totalApproved} approved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};