"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, User, Info, Activity, Bookmark, TrendingUp, Filter } from "lucide-react";
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
}

export default function DashboardContent() {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/events');
        setEvents(response.data.events);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError(err.message || 'Failed to load events');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Calculate stats based on events data
  const upcomingEvents = events.filter(event => new Date(event.beginAt) > new Date());
  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(event.beginAt);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  });
  const pastEvents = events.filter(event => new Date(event.endAt) < new Date());
  const ongoingEvents = events.filter(event => {
    const now = new Date();
    return new Date(event.beginAt) <= now && new Date(event.endAt) >= now;
  });
  
  // Get unique categories
  const categories = [...new Set(events.map(event => event.category))];
  
  // Filter events by category if active
  const filteredEvents = activeCategory 
    ? events.filter(event => event.category === activeCategory)
    : upcomingEvents;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">
          Event <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dashboard</span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: "Total Events", 
            value: isLoading ? "..." : events.length.toString(), 
            color: "from-blue-500/20 to-blue-700/20", 
            icon: <Calendar className="h-6 w-6 text-blue-400/80" /> 
          },
          { 
            title: "Upcoming Events", 
            value: isLoading ? "..." : upcomingEvents.length.toString(), 
            color: "from-purple-500/20 to-purple-700/20", 
            icon: <Bookmark className="h-6 w-6 text-purple-400/80" /> 
          },
          { 
            title: "This Week", 
            value: isLoading ? "..." : `${thisWeekEvents.length}`, 
            color: "from-pink-500/20 to-pink-700/20", 
            icon: <TrendingUp className="h-6 w-6 text-pink-400/80" /> 
          },
          { 
            title: "Ongoing Now", 
            value: isLoading ? "..." : ongoingEvents.length.toString(), 
            color: "from-emerald-500/20 to-emerald-700/20", 
            icon: <Activity className="h-6 w-6 text-emerald-400/80" /> 
          }
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
      
      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-white/60" />
          <h3 className="text-sm text-white/60">Filter by Category</h3>
        </div>
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
      
      {/* Events Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Event List */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-light mb-4">
              {activeCategory ? (
                <span className="capitalize">{activeCategory} <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Events</span></span>
              ) : (
                <span>Upcoming <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Events</span></span>
              )}
            </h2>
            
            {isLoading ? (
              // Loading state
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
              </div>
            ) : error ? (
              // Error state
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
              // No events state
              <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                <div className="inline-flex justify-center items-center p-4 bg-blue-500/20 rounded-full mb-3">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-light mb-2">No events found</h3>
                <p className="text-white/60 text-sm">
                  {activeCategory 
                    ? `There are no ${activeCategory} events scheduled.` 
                    : "There are no upcoming events at this time."}
                </p>
              </div>
            ) : (
              // Events display
              <div className="grid grid-cols-1 gap-4">
                {filteredEvents.slice(0, 6).map(event => (
                  <div 
                    key={event.id} 
                    className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-medium line-clamp-1">{event.title}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          event.category === 'conference' ? 'bg-blue-500/20 text-blue-300' :
                          event.category === 'workshop' ? 'bg-green-500/20 text-green-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {event.category}
                        </span>
                      </div>
                      
                      <div className="text-sm text-white/70 line-clamp-2 mb-4">{event.description}</div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
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
                    </div>
                    
                    <div className="bg-white/5 px-6 py-3 flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          new Date(event.beginAt) > new Date() ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                        <span className="text-xs text-white/60">
                          {new Date(event.beginAt) > new Date() ? 'Upcoming' : 'In progress'}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="text-xs bg-white/10 hover:bg-white/20 py-1 px-2 rounded flex items-center gap-1"
                          onClick={() => window.open(`/events/${event.id}`, '_blank')}
                        >
                          <Info className="h-3 w-3" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Event Insights */}
        <div>
          <h2 className="text-xl font-light mb-4">
            Event <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Insights</span>
          </h2>
          
          <div className="space-y-6">
            {/* Event Categories */}
            <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-sm text-white/60 mb-4">Events by Category</h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(events.reduce((acc: Record<string, number>, event) => {
                    acc[event.category] = (acc[event.category] || 0) + 1;
                    return acc;
                  }, {})).map(([category, count], i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        category === 'conference' ? 'bg-blue-400' :
                        category === 'workshop' ? 'bg-green-400' :
                        'bg-purple-400'
                      }`}></div>
                      <span className="text-sm capitalize">{category}</span>
                      <span className="text-sm text-white/50 ml-auto">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Next Event */}
            <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-sm text-white/60 mb-3">Next Upcoming Event</h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400"></div>
                </div>
              ) : upcomingEvents.length > 0 ? (
                <div>
                  <h4 className="text-lg mb-1">{upcomingEvents[0].title}</h4>
                  <p className="text-sm text-white/70 mb-3">{upcomingEvents[0].description.substring(0, 100)}...</p>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {upcomingEvents[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {upcomingEvents[0].time}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-white/60">No upcoming events scheduled</p>
              )}
            </div>
            
            {/* Monthly Event Distribution */}
            <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-sm text-white/60 mb-4">Monthly Distribution</h3>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Activity className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-light">
                        {thisWeekEvents.length} events this week
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-20 flex items-end justify-between gap-1">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const day = new Date();
                      day.setDate(day.getDate() + i);
                      
                      const count = events.filter(event => {
                        const eventDate = new Date(event.beginAt);
                        return eventDate.getDate() === day.getDate() && 
                              eventDate.getMonth() === day.getMonth() && 
                              eventDate.getFullYear() === day.getFullYear();
                      }).length;
                      
                      const height = count > 0 ? Math.max(20, Math.min(count * 10, 100)) : 4;
                      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                      
                      return (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1">
                          <div 
                            className="w-full bg-purple-500/20 hover:bg-purple-500/30 transition-colors rounded-sm cursor-pointer relative group"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {count} {count === 1 ? 'event' : 'events'}
                            </div>
                          </div>
                          <p className="text-xs text-white/50">{dayNames[day.getDay()]}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}