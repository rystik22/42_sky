import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define event interface
export interface FormattedEvent {
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

interface EventContextType {
  events: FormattedEvent[];
  isLoading: boolean;
  error: string | null;
  addEvent: (event: FormattedEvent) => void;
  updateEvent: (event: FormattedEvent) => void;
  deleteEvent: (eventId: number) => void;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Save custom events to localStorage
  const saveCustomEvents = (customEvents: FormattedEvent[]) => {
    localStorage.setItem('customEvents', JSON.stringify(customEvents));
  };

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

  // Initial fetch of events
  useEffect(() => {
    fetchEvents();
  }, []);

  // Add a new event
  const addEvent = (event: FormattedEvent) => {
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    
    // Save custom events to localStorage
    const customEvents = updatedEvents.filter(e => e.isCustom);
    saveCustomEvents(customEvents);
  };

  // Update an existing event
  const updateEvent = (updatedEvent: FormattedEvent) => {
    const updatedEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    
    // Save custom events to localStorage
    const customEvents = updatedEvents.filter(e => e.isCustom);
    saveCustomEvents(customEvents);
  };

  // Delete an event
  const deleteEvent = (eventId: number) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    
    // Save custom events to localStorage
    const customEvents = updatedEvents.filter(e => e.isCustom);
    saveCustomEvents(customEvents);
  };

  // Function to manually refresh events
  const refreshEvents = async () => {
    await fetchEvents();
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      isLoading, 
      error, 
      addEvent, 
      updateEvent, 
      deleteEvent,
      refreshEvents
    }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the event context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};