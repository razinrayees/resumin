import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Chrome, Github, ArrowRight, Home, Mail, ArrowLeft, Lock } from 'lucide-react';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface LoginProps {
  isSignupMode?: boolean;
}

export const Login: React.FC<LoginProps> = ({ isSignupMode = false }) => {
  const [isLogin, setIsLogin] = useState(!isSignupMode);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  
  const { login, signup, loginWithGoogle, loginWithGitHub, resetPassword, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // Always redirect to dashboard after login/signup
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Set initial state based on prop
  useEffect(() => {
    setIsLogin(!isSignupMode);
  }, [isSignupMode]);

  // Pre-fill EARLY100 coupon code for signup
  useEffect(() => {
    if (!isLogin && !couponCode) {
      setCouponCode('EARLY100');
    }
  }, [isLogin, couponCode]);

  const validateCouponCode = async (code: string): Promise<boolean> => {
    if (!code.trim()) return false;

    try {
      const couponsQuery = query(
        collection(db, 'coupons'),
        where('code', '==', code.toUpperCase())
      );
      
      const querySnapshot = await getDocs(couponsQuery);
      
      if (querySnapshot.empty) {
        return false;
      }

      const couponDoc = querySnapshot.docs[0];
      const couponData = couponDoc.data();
      
      // Check if coupon is active
      if (!couponData.isActive) {
        return false;
      }

      // Check usage limit if it exists
      if (couponData.usageLimit && couponData.usedCount >= couponData.usageLimit) {
        return false;
      }

      // Check expiry date if it exists
      if (couponData.expiryDate && new Date(couponData.expiryDate) < new Date()) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating coupon:', error);
      return false;
    }
  };

  const incrementCouponUsage = async (code: string) => {
    try {
      const couponsQuery = query(
        collection(db, 'coupons'),
        where('code', '==', code.toUpperCase())
      );
      
      const querySnapshot = await getDocs(couponsQuery);
      
      if (!querySnapshot.empty) {
        const couponDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'coupons', couponDoc.id), {
          usedCount: increment(1),
          lastUsed: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error incrementing coupon usage:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back!');
      } else {
        // Validate coupon code for signup
        if (!couponCode.trim()) {
          toast.error('Coupon code is required to join Resumin');
          setLoading(false);
          return;
        }

        setValidatingCoupon(true);
        const isValidCoupon = await validateCouponCode(couponCode);
        setValidatingCoupon(false);

        if (!isValidCoupon) {
          toast.error('This code is invalid or expired. Resumin is invite-only. Contact razin@resumin.link to request one.');
          setLoading(false);
          return;
        }

        await signup(email, password);
        
        // Increment coupon usage after successful signup
        await incrementCouponUsage(couponCode);
        
        toast.success('Account created successfully! Welcome to Resumin!');
        // Note: Navigation to dashboard happens automatically via useEffect when currentUser changes
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLogin) {
      // For Google signup, still need coupon validation
      if (!couponCode.trim()) {
        toast.error('Coupon code is required to join Resumin');
        return;
      }

      setValidatingCoupon(true);
      const isValidCoupon = await validateCouponCode(couponCode);
      setValidatingCoupon(false);

      if (!isValidCoupon) {
        toast.error('This code is invalid or expired. Resumin is invite-only. Contact razin@resumin.link to request one.');
        return;
      }
    }

    setLoading(true);
    try {
      await loginWithGoogle();
      
      // Increment coupon usage for new Google signups
      if (!isLogin) {
        await incrementCouponUsage(couponCode);
      }
      
      toast.success('Welcome!');
      // Note: Navigation to dashboard happens automatically via useEffect when currentUser changes
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    if (!isLogin) {
      // For GitHub signup, still need coupon validation
      if (!couponCode.trim()) {
        toast.error('Coupon code is required to join Resumin');
        return;
      }

      setValidatingCoupon(true);
      const isValidCoupon = await validateCouponCode(couponCode);
      setValidatingCoupon(false);

      if (!isValidCoupon) {
        toast.error('This code is invalid or expired. Resumin is invite-only. Contact razin@resumin.link to request one.');
        return;
      }
    }

    setLoading(true);
    try {
      await loginWithGitHub();
      
      // Increment coupon usage for new GitHub signups
      if (!isLogin) {
        await incrementCouponUsage(couponCode);
      }
      
      toast.success('Welcome!');
      // Note: Navigation to dashboard happens automatically via useEffect when currentUser changes
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      toast.success('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email address');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Please enter a valid email address');
      } else {
        toast.error(error.message || 'Failed to send reset email');
      }
    } finally {
      setResetLoading(false);
    }
  };

  // Forgot Password Form
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col lg:flex-row">
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors text-gray-700 hover:text-gray-900 text-sm sm:text-base"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
        </div>
        
        {/* Left Side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-12">
          <div className="max-w-lg text-center">
            <div className="w-20 h-20 xl:w-28 xl:h-28 flex items-center justify-center mx-auto mb-6 xl:mb-8">
              <img 
                src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/2logo.png" 
                alt="Resumin Logo" 
                className="w-16 h-16 xl:w-24 xl:h-24 object-contain" 
                loading="lazy"
              />
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-4 xl:mb-6">
              Reset Your Password
            </h1>
            <p className="text-lg xl:text-xl text-gray-600 mb-6 xl:mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 min-h-screen lg:min-h-0">
          <div className="max-w-md w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8 pt-12">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/2logo.png" 
                  alt="Resumin Logo" 
                  className="w-12 h-12 object-contain" 
                  loading="lazy"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600 text-sm">
                We'll send you a reset link
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-orange-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handlePasswordReset} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Mail size={18} />
                  <span>{resetLoading ? 'Sending...' : 'Send Reset Link'}</span>
                </button>
              </form>

              <div className="mt-6 sm:mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mx-auto text-sm sm:text-base"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Login/Signup Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col lg:flex-row">
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/"
          className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors text-gray-700 hover:text-gray-900 text-sm sm:text-base"
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
      </div>
      
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-12">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 xl:w-28 xl:h-28 flex items-center justify-center mx-auto mb-6 xl:mb-8">
            <img 
              src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/2logo.png" 
              alt="Resumin Logo" 
              className="w-16 h-16 xl:w-24 xl:h-24 object-contain" 
              loading="lazy"
            />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-4 xl:mb-6">
            {isLogin ? 'Welcome Back to Resumin' : 'Join Resumin'}
          </h1>
          <p className="text-lg xl:text-xl text-gray-600 mb-6 xl:mb-8">
            {isLogin 
              ? 'Sign in to manage your professional resume and showcase your skills.'
              : 'Create your professional resume page with an invite code. Get your personalized link in minutes.'
            }
          </p>
          {!isLogin && (
            <div className="bg-green-100 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-green-800 mb-2">
                <Lock size={16} />
                <span className="font-semibold text-sm">Early Access Special</span>
              </div>
              <p className="text-green-700 text-sm mb-2">
                Use code <code className="bg-green-200 px-2 py-1 rounded font-bold">EARLY100</code> to join our exclusive community.
              </p>
            </div>
          )}
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm xl:text-base">
            <span>resumin.link/</span>
            <span className="font-semibold text-orange-600">your-username</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 min-h-screen lg:min-h-0">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8 pt-12">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img 
                src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/2logo.png" 
                alt="Resumin Logo" 
                className="w-12 h-12 object-contain" 
                loading="lazy"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Resumin'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin ? 'Sign in to your account' : 'Create your professional profile'}
            </p>
            {!isLogin && (
              <div className="bg-green-100 border border-green-200 rounded-lg p-3 mt-4">
                <div className="flex items-center justify-center space-x-2 text-green-800 mb-1">
                  <Lock size={14} />
                  <span className="font-semibold text-xs">Early Access</span>
                </div>
                <p className="text-green-700 text-xs">
                  Use code <code className="bg-green-200 px-1 rounded font-bold">EARLY100</code>
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin ? 'Sign in to your account' : 'Create your professional profile'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Coupon Code Field - Only for Signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      required
                      className="w-full px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all text-sm sm:text-base pr-12"
                      placeholder="Enter your invite code"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Lock size={20} className="text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Try <code className="bg-gray-100 px-1 rounded font-bold">EARLY100</code> or email <a href="mailto:razin@resumin.link" className="text-orange-600 hover:text-orange-700">razin@resumin.link</a>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 transition-all pr-12 text-sm sm:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {isLogin && (
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || validatingCoupon}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>
                  {loading || validatingCoupon 
                    ? (validatingCoupon ? 'Validating code...' : 'Please wait...') 
                    : (isLogin ? 'Sign In' : 'Create Account')
                  }
                </span>
                {!loading && !validatingCoupon && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-4 sm:mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading || validatingCoupon || (!isLogin && !couponCode.trim())}
                  className="flex items-center justify-center px-4 py-3 sm:py-4 border border-gray-200 rounded-xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  <Chrome size={20} className="mr-2" />
                  Google
                </button>

                <button
                  onClick={handleGitHubLogin}
                  disabled={loading || validatingCoupon || (!isLogin && !couponCode.trim())}
                  className="flex items-center justify-center px-4 py-3 sm:py-4 border border-gray-200 rounded-xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  <Github size={20} className="mr-2" />
                  GitHub
                </button>
              </div>
              
              {!isLogin && !couponCode.trim() && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter a coupon code to enable social sign-up
                </p>
              )}
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Link
                  to={isLogin ? "/signup" : "/login"}
                  className="ml-2 text-orange-600 hover:text-orange-700 font-semibold"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};