"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2, Save, X, Filter } from "lucide-react";
import axios from "axios";

// Define event interface based on your API response
interface FormattedEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  time: string;
  beginAt: string;
  endAt: string;
  maxAttendees: number | null;
  currentAttendees: number;
  isCustom?: boolean;
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<FormattedEvent | null>(null);
  
  // New event form state
  const [formData, setFormData] = useState<Partial<FormattedEvent>>({
    title: "",
    description: "",
    location: "",
    category: "workshop", // default category
    date: "",
    time: "",
    beginAt: "",
    endAt: "",
    maxAttendees: null,
    currentAttendees: 0
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        
        // First, try to get custom events from localStorage
        const customEventsStr = localStorage.getItem('customEvents');
        const customEvents: FormattedEvent[] = customEventsStr ? JSON.parse(customEventsStr) : [];
        
        // Then, fetch events from API
        const response = await axios.get('/api/events');
        const apiEvents = response.data.events;
        
        // Merge API events with custom events
        setEvents([...apiEvents, ...customEvents]);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching events:', err);
        
        // If API fails, try to get events from local storage only
        const customEventsStr = localStorage.getItem('customEvents');
        const customEvents = customEventsStr ? JSON.parse(customEventsStr) : [];
        
        if (customEvents.length > 0) {
          setEvents(customEvents);
          setError("API error, showing locally saved events only");
        } else {
          setError(err.message || 'Failed to load events');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Save custom events to localStorage
  const saveCustomEvents = (updatedEvents: FormattedEvent[]) => {
    const customEvents = updatedEvents.filter(event => event.isCustom);
    localStorage.setItem('customEvents', JSON.stringify(customEvents));
  };
  
  // Calculate upcoming events for default filter
  const upcomingEvents = events.filter(event => new Date(event.beginAt) > new Date());
  
  // Get unique categories
  const categories = [...new Set(events.map(event => event.category))];
  
  // Filter events by category if active
  const filteredEvents = activeCategory 
    ? events.filter(event => event.category === activeCategory)
    : upcomingEvents;
  
  // Format date for form
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  // Format time for form
  const formatTimeForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toTimeString().split(' ')[0].substring(0, 5);
  };
  
  // Handle opening the form for editing
  const handleEditEvent = (event: FormattedEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      category: event.category,
      date: formatDateForInput(event.beginAt),
      time: `${formatTimeForInput(event.beginAt)} - ${formatTimeForInput(event.endAt)}`,
      beginAt: event.beginAt,
      endAt: event.endAt,
      maxAttendees: event.maxAttendees,
      currentAttendees: event.currentAttendees
    });
    setShowEventForm(true);
  };
  
  // Handle opening the form for adding
  const handleAddEvent = () => {
    setEditingEvent(null);
    const today = new Date();
    setFormData({
      title: "",
      description: "",
      location: "",
      category: "workshop",
      date: formatDateForInput(today.toISOString()),
      time: "09:00 - 11:00",
      maxAttendees: 50,
      currentAttendees: 0,
    });
    setShowEventForm(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'maxAttendees' ? (value === '' ? null : Number(value)) : value
    });
  };
  
  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Parse date and time
    const dateStr = formData.date || '';
    const timeRange = (formData.time || '').split('-');
    const startTime = timeRange[0]?.trim() || '00:00';
    const endTime = timeRange[1]?.trim() || '23:59';
    
    // Create Date objects
    const beginAt = new Date(`${dateStr}T${startTime}:00`);
    const endAt = new Date(`${dateStr}T${endTime}:00`);
    
    // Format for display
    const formattedDate = formatDate(beginAt.toISOString());
    const formattedTime = `${startTime} - ${endTime}`;
    
    // Create the event object
    const eventToSave: FormattedEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title: formData.title || 'Untitled Event',
      description: formData.description || '',
      location: formData.location || 'TBD',
      category: formData.category || 'workshop',
      date: formattedDate,
      time: formattedTime,
      beginAt: beginAt.toISOString(),
      endAt: endAt.toISOString(),
      maxAttendees: formData.maxAttendees ?? null,
      currentAttendees: formData.currentAttendees || 0,
      isCustom: true
    };
    
    // Update events array
    const updatedEvents = editingEvent 
      ? events.map(event => event.id === editingEvent.id ? eventToSave : event)
      : [...events, eventToSave];
    
    setEvents(updatedEvents);
    
    // Save to local storage
    saveCustomEvents(updatedEvents);
    
    // Reset form
    setShowEventForm(false);
    setEditingEvent(null);
  };
  
  // Handle event deletion
  const handleDeleteEvent = (eventId: number) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    saveCustomEvents(updatedEvents);
  };

  // Helper function to format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">
          Events <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Management</span>
        </h1>
        <button 
          onClick={handleAddEvent}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Event
        </button>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              activeCategory === null 
                ? 'bg-blue-500/30 text-blue-100' 
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All Events
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors capitalize ${
                activeCategory === category
                  ? 'bg-purple-500/30 text-purple-100' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Events List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center text-white/90">
          <p>Failed to load events: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
          <div className="inline-flex justify-center items-center p-4 bg-blue-500/20 rounded-full mb-3">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-light mb-2">No events found</h3>
          <p className="text-white/60 text-sm mb-4">
            {activeCategory 
              ? `There are no ${activeCategory} events scheduled.` 
              : "There are no upcoming events at this time."}
          </p>
          <button
            onClick={handleAddEvent}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create New Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                      event.category === 'conference' ? 'bg-blue-500/20 text-blue-300' :
                      event.category === 'workshop' ? 'bg-green-500/20 text-green-300' :
                      event.category === 'hackathon' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {event.category}
                    </span>
                    {event.isCustom && (
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 text-xs rounded-full">
                        Custom
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-white/50" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/50" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white/50" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-white/50" />
                    <span>
                      {event.currentAttendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    className="text-xs bg-white/10 hover:bg-white/20 py-1.5 px-3 rounded flex items-center gap-1"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button 
                    className="text-xs bg-red-500/20 hover:bg-red-500/30 py-1.5 px-3 rounded flex items-center gap-1 text-red-300"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900/95 border border-white/10 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-light">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <button 
                onClick={() => setShowEventForm(false)} 
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-1">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="meetup">Meetup</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/60 text-sm mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 h-24 focus:outline-none focus:border-blue-500 resize-none"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Time (format: HH:MM - HH:MM)</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="09:00 - 11:00"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">
                    Max Attendees <span className="text-white/40">(leave empty for unlimited)</span>
                  </label>
                  <input
                    type="number"
                    name="maxAttendees"
                    value={formData.maxAttendees === null ? '' : formData.maxAttendees}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Current Attendees</label>
                  <input
                    type="number"
                    name="currentAttendees"
                    value={formData.currentAttendees}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}