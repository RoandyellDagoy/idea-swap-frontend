import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, LogOut } from 'lucide-react';

const LoginDashboard = () => {
  const [view, setView] = useState<'signin' | 'signup' | 'dashboard'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = () => {
    // Add your sign in logic here
    setView('dashboard');
  };

  const handleSignUp = () => {
    // Add your sign up logic here
    setView('dashboard');
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setView('signin');
  };

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">You're successfully signed in</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800 font-semibold">{formData.name || 'User'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-800 font-semibold">{formData.email || 'user@example.com'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            {view === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-purple-100">
            {view === 'signin' ? 'Sign in to continue' : 'Join us today'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-5">
            {view === 'signup' && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300"
                  required
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {view === 'signup' && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300"
                  required
                />
              </div>
            )}

            {view === 'signin' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-purple-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              onClick={view === 'signin' ? handleSignIn : handleSignUp}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {view === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {view === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setView(view === 'signin' ? 'signup' : 'signin')}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {view === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-3 px-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-all duration-300 hover:border-purple-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="flex justify-center items-center py-3 px-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-all duration-300 hover:border-purple-300">
                <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="flex justify-center items-center py-3 px-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-all duration-300 hover:border-purple-300">
                <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default LoginDashboard;