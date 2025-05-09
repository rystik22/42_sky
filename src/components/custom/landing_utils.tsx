"use client";
import { useState } from 'react';
import { Calendar, Clock, Search, MapPin, ChevronRight, PlusCircle, Bell, Menu, X, User, LogIn } from 'lucide-react';
import { Header } from '..//custom/header';

// Types
export type Category = 'competition' | 'workshop' | 'social' | 'lecture';

export type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: Category;
};

// Mock data for events
export const events = [
  {
    id: 1,
    title: "Hackathon Finals",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "42 Abu Dhabi, Main Campus",
    description: "Join us for the culmination of months of coding challenges. The top teams will present their projects to judges from leading tech companies.",
    image: "/api/placeholder/800/400",
    category: "competition"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    date: "May 18, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual Room 101",
    description: "Learn advanced React techniques from industry experts. Topics include state management, performance optimization, and component design.",
    image: "/api/placeholder/800/400",
    category: "workshop"
  },
  {
    id: 3,
    title: "42 Community Meetup",
    date: "May 22, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, Floor 3",
    description: "Monthly gathering for all 42 Abu Dhabi community members. Network with peers, share project updates, and learn about upcoming opportunities.",
    image: "/api/placeholder/800/400",
    category: "social"
  },
  {
    id: 4,
    title: "AI Ethics Symposium",
    date: "May 28, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Auditorium B",
    description: "Explore the ethical implications of artificial intelligence in modern society with guest speakers from academia and industry.",
    image: "/api/placeholder/800/400",
    category: "lecture"
  }
];

// Category badge styling
const categoryStyles = {
  competition: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  workshop: "bg-blue-50 text-blue-700 border border-blue-200",
  social: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  lecture: "bg-amber-50 text-amber-700 border border-amber-200"
};

export const CategoryBadge = ({ category }: { category: Category }) => (
  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryStyles[category]}`}>
    {category}
  </span>
);

// Navbar component with minimalist design
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <Header />
       <div className="max-w-6xl mx-auto px-4">
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

// Event card component
export const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all hover:shadow-sm group">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img 
          src={event.image} 
          alt={event.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out mix-blend-multiply" 
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <CategoryBadge category={event.category as Category} />
          <span className="text-xs text-gray-400">{event.date.split(',')[0]}</span>
        </div>
        <h3 className="font-medium text-lg text-gray-900 mb-3">{event.title}</h3>
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{event.time}</span>
          <span className="mx-2">•</span>
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">12 attending</span>
          <button className="text-xs font-medium text-black hover:underline">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Event modal for viewing event details
export const EventModal = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
  if (!event) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-xl">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm text-black rounded-full p-1.5 hover:bg-white transition-colors z-10"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="h-48 bg-gray-100 relative">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover mix-blend-multiply" 
            />
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <CategoryBadge category={event.category as Category} />
            <span className="text-xs text-gray-500">{event.date}</span>
          </div>
          
          <h2 className="text-2xl font-medium text-gray-900 mb-4">{event.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-2">About this event</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
              RSVP
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full text-sm font-medium hover:border-gray-900 hover:text-black transition-colors">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
