"use client";

import { Layers, Calendar, Users, Settings } from "lucide-react";

export default function Sidebar({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layers className="h-5 w-5" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="h-5 w-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 bg-gray-900/50 border-r border-white/10 backdrop-blur-md">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
                  activePage === item.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                } transition-colors`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}