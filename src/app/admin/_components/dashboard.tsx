"use client";

import { Calendar, Users } from "lucide-react";

export default function DashboardContent() {
  return (
    <div className="p-6">
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
          { title: "Total Events", value: "24", color: "from-blue-500/20 to-blue-700/20", icon: <Calendar className="h-6 w-6 text-blue-400/80" /> },
          { title: "Active Users", value: "156", color: "from-purple-500/20 to-purple-700/20", icon: <Users className="h-6 w-6 text-purple-400/80" /> },
          { title: "This Week", value: "5 events", color: "from-pink-500/20 to-pink-700/20", icon: <Calendar className="h-6 w-6 text-pink-400/80" /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} blur-xl opacity-50`}></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="p-3 bg-black/30 rounded-lg">{stat.icon}</div>
              <div>
                <h3 className="text-sm text-white/60 mb-1">{stat.title}</h3>
                <p className="text-3xl font-light">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}