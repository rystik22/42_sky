"use client";
import { useState } from 'react';
import { Calendar, Clock, Search, MapPin, X } from 'lucide-react';
import { Category, Event } from './landing_utils';

const CategoryBadge = ({ category }: { category: Category }) => {
  const styles: Record<Category, { bg: string; text: string }> = {
    community: { bg: 'bg-blue-100', text: 'text-blue-800' },
    workshop: { bg: 'bg-orange-100', text: 'text-orange-800' },
    social: { bg: 'bg-green-100', text: 'text-green-800' },
    tech: { bg: 'bg-purple-100', text: 'text-purple-800' },
    competition: { bg: 'bg-red-100', text: 'text-red-800' },
    lecture: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
  };

  const style = styles[category] || { bg: 'bg-gray-100', text: 'text-gray-800' };

  return (
    <span className={`${style.bg} ${style.text} text-xs font-medium px-2.5 py-0.5 rounded`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};

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
