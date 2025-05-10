"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Layers, Users, Calendar, Settings, LogOut } from "lucide-react";
import Cookies from 'js-cookie';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Check if admin is logged in
    useEffect(() => {
        // middleware will redirect if not authenticated,
        // we'll still check as a backup
        const adminToken = Cookies.get("adminToken");
        
        if (!adminToken) {
            // Redirect to login if no token found
            router.push("/admin/auth");
        } else {
            // In a real app, you'd verify this token on your backend
            setIsAuthorized(true);
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        // Remove the token from cookies
        Cookies.remove("adminToken", { path: '/' });
        router.push("/admin/auth");
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    // Show protected content only when authorized
    if (!isAuthorized) {
        return null; // This prevents flash of content before redirect
    }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-white/10 fixed top-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-lg">42 <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin</span></span>
              </div>
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

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 bg-gray-900/50 border-r border-white/10 backdrop-blur-md">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a 
                  href="#dashboard" 
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-white/10 text-white"
                >
                  <Layers className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a 
                  href="#events" 
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Events</span>
                </a>
              </li>
              <li>
                <a 
                  href="#users" 
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a 
                  href="#settings" 
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-light">
                Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin Dashboard</span>
              </h1>
              <div className="text-sm text-white/50">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Dashboard stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Total Events", value: "24", color: "from-blue-500/20 to-blue-700/20" },
                { title: "Active Users", value: "156", color: "from-purple-500/20 to-purple-700/20" },
                { title: "This Week", value: "5 events", color: "from-pink-500/20 to-pink-700/20" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden">
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} blur-xl opacity-50`}></div>
                  <div className="relative z-10">
                    <h3 className="text-sm text-white/60 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-light">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent events */}
            <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-light mb-4">Recent Events</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-white/60 border-b border-white/10">
                      <th className="pb-3 font-normal">Event Name</th>
                      <th className="pb-3 font-normal">Date</th>
                      <th className="pb-3 font-normal">Status</th>
                      <th className="pb-3 font-normal">Attendees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Introduction to AI", date: "May 15", status: "Upcoming", attendees: 42 },
                      { name: "Hackathon Finals", date: "May 18", status: "Upcoming", attendees: 24 },
                      { name: "Community Mixer", date: "May 20", status: "Upcoming", attendees: 37 },
                      { name: "Industry Expert Talk", date: "May 22", status: "Upcoming", attendees: 15 },
                    ].map((event, idx) => (
                      <tr key={idx} className="border-b border-white/5">
                        <td className="py-3">{event.name}</td>
                        <td className="py-3 text-white/70">{event.date}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                            {event.status}
                          </span>
                        </td>
                        <td className="py-3 text-white/70">{event.attendees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}