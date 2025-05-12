"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, LogIn, LogOut, Menu, Search, Shield, User, X } from "lucide-react";
import { useAuth } from "../../components/custom/client_component_wrapper";
import Cookies from 'js-cookie';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for user data in cookies on component mount
    const storedUserData = Cookies.get("userData");
    if (storedUserData && !user) {
      // If there's stored user data but no user in context
      const parsedUser = JSON.parse(storedUserData);
      setLocalUser(parsedUser);
      console.log("User data found in cookies", parsedUser);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    setLocalUser(null);
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10"
          : "bg-black/70 backdrop-blur-lg border-b border-white/5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-4 group">
            <img
              src="/image.png"
              alt="42 Events Logo"
              className="h-10 w-40 rounded-sm shadow-lg shadow-white-500/20 transition-all duration-300 group-hover:shadow-white-500/40"
            />
            <span className="font-bold text-2xl font-stretch-50% tracking-wider bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-lg transition-all duration-300 animate-pulse-slow font-mono">
              SKY
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1.5 border border-gray-700 rounded-full text-sm w-56 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-900/50 text-gray-200 placeholder-gray-400"
              />
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            </div>
            <a href="/events" className="text-sm text-gray-300 hover:text-white">
              Browse
            </a>
            
            {/* User Profile or Login Button */}
            {(() => {
              // Check cookies for user data since context might not be updated yet
              const userData = Cookies.get("userData");
              const parsedUser = userData ? JSON.parse(userData) : null;
              const activeUser = user || localUser || parsedUser;
              
              if (activeUser) {
                return (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="relative">
                        {activeUser.avatar ? (
                          <img 
                            src={activeUser.avatar} 
                            alt={activeUser.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {activeUser.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                      </div>
                      <span className="text-white font-medium">
                        {activeUser.login || activeUser.name}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 py-1 px-3 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" /> 
                      <span>Logout</span>
                    </button>
                  </div>
                );
              } else {
                return (
                  <>
                    <Link 
                      href="/admin/auth"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                    <Link
                      href="/user/login"
                      className="flex items-center gap-1.5 py-1.5 px-4 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      <span>Sign In</span>
                    </Link>
                  </>
                );
              }
            })()}
            
            <button className="p-1.5 rounded-full hover:bg-white/10">
              <Bell className="h-4 w-4 text-gray-300" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-300 hover:text-white">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          className={`md:hidden px-4 pb-4 pt-2 border-b border-white/10 transition-all duration-300 ${
            scrolled ? "bg-black/40 backdrop-blur-md" : "bg-black/70 backdrop-blur-lg"
          }`}
        >
          {/* Mobile navigation content */}
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1.5 border border-gray-700 rounded-full text-sm w-full focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-900/50 text-gray-200 placeholder-gray-400"
              />
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            </div>
            <a href="/events" className="py-2 text-sm text-gray-300 hover:text-white">
              Browse Events
            </a>
            
            {/* Mobile User Profile or Login Button */}
            {(() => {
              const userData = Cookies.get("userData");
              const parsedUser = userData ? JSON.parse(userData) : null;
              const activeUser = user || localUser || parsedUser;
              
              if (activeUser) {
                return (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {activeUser.avatar ? (
                        <img 
                          src={activeUser.avatar} 
                          alt={activeUser.name}
                          className="w-7 h-7 rounded-full object-cover border border-white/20"
                        />
                      ) : (
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-xs">
                            {activeUser.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-white text-sm font-medium">
                        {activeUser.login || activeUser.name}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Logout
                    </button>
                  </div>
                );
              } else {
                return (
                  <>
                    <button
                      onClick={() => window.location.href = '/user/login'}
                      className="py-2 flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </button>
                    <button
                      onClick={() => window.location.href = '/admin/auth'}
                      className="py-2 text-sm flex items-center text-gray-300 hover:text-white"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Admin Login
                    </button>
                  </>
                );
              }
            })()}
            
            <button className="py-2 flex items-center text-sm text-gray-300 hover:text-white">
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </button>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-purple-900/20 via-indigo-800/10 to-blue-900/20 pointer-events-none transition-opacity duration-500 ${
          scrolled ? "opacity-40" : "opacity-70"
        }`}
      ></div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transition-all duration-700 ease-in-out ${
          scrolled ? "opacity-100 blur-sm" : "opacity-0"
        }`}
      ></div>
    </nav>
  );
};