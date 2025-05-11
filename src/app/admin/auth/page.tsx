'use client';

import { useState, useEffect } from 'react';
import { Shield, Lock, User, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie'; // You'll need to install this: npm install js-cookie
import { AdminLoginModal } from '../_components/admin_login_modal';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const adminToken = Cookies.get('adminToken');
    if (adminToken) {
      router.push('/admin');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simple validation
      if (username === 'admin' && password === 'admin123') {
        // Set admin token in cookies
        Cookies.set('adminToken', 'admin-auth-token', { 
          expires: 7, // 7 days
          path: '/' 
        });
        
        // Redirect to admin dashboard
        console.log('Login successful, redirecting...');
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Back button to main menu */}
      <Link href="/"
        className="fixed top-6 left-6 flex items-center text-white/70 hover:text-white text-sm gap-1 py-2 px-3 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md transition-colors z-20"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Main Menu
      </Link>

      {/* Background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-xl w-full max-w-md shadow-xl relative">
        <div className="p-8">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

          <div className="flex items-center justify-center mb-6 relative z-10">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-light text-center mb-2 text-white relative z-10">
            Admin <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Access</span>
          </h2>
          
          <p className="text-center text-white/60 text-sm mb-6 relative z-10">
            Sign in to manage events and users
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-red-200 text-center relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white/70 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-white/40"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-white/70 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-white/40"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-gray-100 transition-colors mt-2 group disabled:opacity-70"
              >
                {isLoading ? 'Signing in...' : 'Sign in as Admin'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center relative z-10">
            <p className="text-sm text-white/50">
              Need assistance?{' '}
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Contact support
              </a>
            </p>
            <p className="text-stone-50 font-thin text-xs mt-2">
              Please use a larger screen or enable desktop mode to sign in as admin
            </p>
          </div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}