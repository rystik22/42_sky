'use client';

import { useState } from 'react';
import { Shield, Lock, User } from 'lucide-react';

export function AdminLoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login with:', username, password);
    // Add your authentication logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-white/10 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 relative">
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white/70 hover:text-white" 
            aria-label="Close admin login"
          >
            ✕
          </button>

          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

          <div className="flex items-center justify-center mb-6 relative z-10">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-light text-center mb-6 relative z-10">
            Admin <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Access</span>
          </h2>

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
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black rounded-lg py-3 text-sm font-medium hover:bg-gray-100 transition-colors mt-2"
              >
                Sign in as Admin
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
          </div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login with:', username, password);
    // Add your authentication logic here
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
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
                className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-gray-100 transition-colors mt-2 group"
              >
                Sign in as Admin
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
          </div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}