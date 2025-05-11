"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

// Import components
import Header from "./_components/header_ad";
import Sidebar from "./_components/sidebar";
import DashboardContent from "./_components/dashboard";
import EventsPage from "./_components/events_ad";
import UsersPage from "./_components/user_ad";
import SettingsPage from "./_components/setting_ad";

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Check authorization on load
  useEffect(() => {
    const adminToken = Cookies.get("adminToken");
    
    if (!adminToken) {
      router.push("/admin/auth");
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Don't render anything if not authorized (prevent flash before redirect)
  if (!isAuthorized) {
    return null;
  }

  // Render the active page content
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'events':
        return <EventsPage />;
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      <div className="pt-16 flex">
        {/* Sidebar */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content */}
        <main className="ml-64 flex-1">
          {renderPage()}
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