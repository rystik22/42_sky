"use client";

import { Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Header() {
  const router = useRouter();
  
  const handleLogout = () => {
    Cookies.remove("adminToken", { path: '/' });
    router.push("/admin/auth");
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-white/10 fixed top-0 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-4 group">
              <img
              src="/image.png"
              alt="42 Events Logo"
              className="h-10 w-40 rounded-sm shadow-lg shadow-white-500/20 transition-all duration-300 group-hover:shadow-white-500/40"
              />
              <span className="font-bold text-2xl font-stretch-50% tracking-wider bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-lg transition-all duration-300 animate-pulse-slow font-mono">
              SKY
              </span>
              <span className="font-thin"> |   ADMIN</span>
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-white/70 hover:text-white gap-1 py-1 px-3 rounded-full hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}