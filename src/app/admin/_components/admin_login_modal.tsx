'use client';

import { useState } from 'react';
import { Shield, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Change from default export to named export
export function AdminLoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simple validation
      if (username === 'admin' && password === 'admin123') {
        // Set admin token in cookies (secure and http-only in production)
        Cookies.set('adminToken', 'admin-auth-token', { 
          expires: 7, // 7 days
          path: '/' 
        });
        
        // Close modal and redirect to admin dashboard
        onClose();
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
                disabled={isLoading}
                className="w-full bg-white text-black rounded-lg py-3 text-sm font-medium hover:bg-gray-100 transition-colors mt-2 disabled:opacity-70"
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
          </div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

// Also keep the default export for backward compatibility
export default AdminLoginModal;