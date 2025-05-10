"use client";
import { useState, useEffect } from "react";
import { Search, Bell, Menu, X, LogIn, Shield } from "lucide-react";
import { AdminLoginModal } from "../../app/admin/admin_login";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-lg transition-all duration-300 animate-pulse-slow font-mono">
              EVENTS
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
            <a href="/create" className="text-sm text-gray-300 hover:text-white">
              Create
            </a>
            <a href="/login" className="flex items-center text-sm text-gray-300 hover:text-white">
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </a>
            <button
              onClick={() => setShowAdminLogin(true)}
              className="flex items-center text-sm text-gray-300 hover:text-white"
            >
              <Shield className="h-4 w-4 mr-1" />
              Admin
            </button>
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
            <a href="/create" className="py-2 text-sm text-gray-300 hover:text-white">
              Create Event
            </a>
            <a href="/login" className="py-2 text-sm text-gray-300 hover:text-white">
              Login
            </a>
            <button
              onClick={() => {
                setShowAdminLogin(true);
                setIsOpen(false);
              }}
              className="py-2 text-sm flex items-center text-gray-300 hover:text-white"
            >
              <Shield className="h-4 w-4 mr-1" />
              Admin Login
            </button>
            <button className="py-2 flex items-center text-sm text-gray-300 hover:text-white">
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-purple-900/20 via-indigo-800/10 to-blue-900/20 pointer-events-none transition-opacity duration-500 ${
          scrolled ? "opacity-40" : "opacity-70"
        }`}
      ></div>

      {/* Scroll highlight */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transition-all duration-700 ease-in-out ${
          scrolled ? "opacity-100 blur-sm" : "opacity-0"
        }`}
      ></div>

      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </nav>
  );
};
