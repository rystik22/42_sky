"use client";
import { useState } from 'react';
import { Calendar, Clock, Search, MapPin, ChevronRight, PlusCircle, Bell, Menu, X, User } from 'lucide-react';

// Mock data for events
const events = [
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

type Category = 'competition' | 'workshop' | 'social' | 'lecture';

const CategoryBadge = ({ category }: { category: Category }) => (
  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryStyles[category]}`}>
    {category}
  </span>
);

// Navbar component with minimalist design
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-sm bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">42</span>
              </div>
              <span className="font-medium text-lg tracking-tight">events</span>
              <span className="text-xs text-gray-500 self-end mb-1">abudhabi.ae</span>
            </div>
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
            
            <a href="#" className="text-sm text-gray-600 hover:text-black">Browse</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black">Create</a>
            
            <div className="flex space-x-2">
              <button className="p-1.5 rounded-full hover:bg-gray-100">
                <Bell className="h-4 w-4 text-gray-500" />
              </button>
              <button className="p-1.5 rounded-full bg-gray-100">
                <User className="h-4 w-4 text-gray-700" />
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
            
            <a href="#" className="py-2 text-sm text-gray-600">Browse Events</a>
            <a href="#" className="py-2 text-sm text-gray-600">Create Event</a>
            <a href="#" className="py-2 text-sm text-gray-600">Notifications</a>
            <a href="#" className="py-2 text-sm text-gray-600">Account</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero section with minimalist design
const Hero = () => {
  return (
    <div className="pt-16 mt-6 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-6">
              42 Abu Dhabi Community
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">
              Connect through <span className="font-medium">meaningful events</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mb-8">
              Discover workshops, meetups, and competitions designed for the 42 Abu Dhabi community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors font-medium text-sm">
                Explore Events
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full hover:border-gray-900 hover:text-black transition-colors font-medium text-sm flex items-center justify-center">
                <PlusCircle className="h-4 w-4 mr-2" /> Host an Event
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
              <img 
                src="/api/placeholder/600/450" 
                alt="42 Abu Dhabi community" 
                className="w-full h-full object-cover mix-blend-multiply" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <CategoryBadge category="workshop" />
                  <span className="text-xs text-gray-500">Today</span>
                </div>
                <h3 className="font-medium text-lg">Introduction to Machine Learning</h3>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>2:00 PM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured events with minimalist cards
const FeaturedEvents = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-3">
            Upcoming
          </span>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light">Events you might like</h2>
            <button className="text-sm text-gray-600 hover:text-black flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all hover:shadow-sm group">
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
          ))}
        </div>
      </div>
    </div>
  );
};

// Categories section with minimal design
const EventCategories = () => {
  const categories = [
    { name: "Workshops", description: "Hands-on learning experiences", count: 24 },
    { name: "Competitions", description: "Test your skills and win prizes", count: 15 },
    { name: "Social", description: "Connect with the community", count: 18 },
    { name: "Lectures", description: "Learn from industry experts", count: 12 }
  ];
  
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-3">
            Categories
          </span>
          <h2 className="text-2xl font-light">Browse by interest</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <span className="text-xs text-gray-500">{category.count}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <button className="text-xs flex items-center font-medium group-hover:text-black transition-colors">
                Explore <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Community stats with minimal design
const StatsSection = () => {
  return (
    <div className="bg-black py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full mb-6">
            Our Community
          </span>
          <h2 className="text-3xl font-light">Join the 42 Abu Dhabi network</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-light">150+</div>
            <div className="mt-2 text-sm text-gray-400">Active Events</div>
          </div>
          <div>
            <div className="text-3xl font-light">1,200+</div>
            <div className="mt-2 text-sm text-gray-400">Community Members</div>
          </div>
          <div>
            <div className="text-3xl font-light">24/7</div>
            <div className="mt-2 text-sm text-gray-400">Support Available</div>
          </div>
          <div>
            <div className="text-3xl font-light">98%</div>
            <div className="mt-2 text-sm text-gray-400">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Minimalist footer
const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded-sm bg-black flex items-center justify-center">
                <span className="text-white font-bold text-xs">42</span>
              </div>
              <span className="font-medium text-sm">events.abudhabi.ae</span>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              The official event platform for 42 Abu Dhabi, connecting students, alumni, 
              and industry partners through meaningful gatherings and learning opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Browse Events</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Create Event</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Calendar</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>events@42abudhabi.ae</li>
              <li>42 Abu Dhabi Campus</li>
              <li>Mina Zayed, Abu Dhabi, UAE</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">© 2025 42 Abu Dhabi. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-400 hover:text-black">Privacy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-black">Terms</a>
            <a href="#" className="text-xs text-gray-400 hover:text-black">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Event modal for viewing event details
const EventModal = ({ event, onClose }: { event: typeof events[0] | null; onClose: () => void }) => {
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

// Main App component
export default function EventManagementApp() {
  const [previewEvent, setPreviewEvent] = useState(null);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedEvents />
      <EventCategories />
      <StatsSection />
      <Footer />
      
      {previewEvent && (
        <EventModal event={previewEvent} onClose={() => setPreviewEvent(null)} />
      )}
    </div>
  );
}