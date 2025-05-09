// Header.tsx
"use client";
import { useState } from "react";
import { Search, Bell, Menu, X, LogIn } from "lucide-react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-sm bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">42</span>
              </div>
              <span className="font-medium text-lg tracking-tight">events</span>
              <span className="text-xs text-gray-500 self-end mb-1">abudhabi.ae</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black w-56 bg-gray-50"
              />
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            </div>

            <a href="/events" className="text-sm text-gray-600 hover:text-black">Browse</a>
            <a href="/create" className="text-sm text-gray-600 hover:text-black">Create</a>

            <div className="flex space-x-4">
              <a href="/login" className="flex items-center text-sm text-gray-600 hover:text-black">
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </a>
              <button className="p-1.5 rounded-full hover:bg-gray-100">
                <Bell className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white border-b border-gray-100">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black w-full bg-gray-50"
              />
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            </div>
            <a href="/events" className="py-2 text-sm text-gray-600">Browse Events</a>
            <a href="/create" className="py-2 text-sm text-gray-600">Create Event</a>
            <a href="/login" className="py-2 text-sm text-gray-600">Login</a>
            <a href="/account" className="py-2 text-sm text-gray-600">Account</a>
          </div>
        </div>
      )}
    </nav>
  );
};
