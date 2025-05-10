"use client";
import { useState, useEffect } from 'react';
import { Calendar, Clock, Search, MapPin, ChevronRight, PlusCircle, Bell, Menu, X, User, LogIn } from 'lucide-react';

// Types
export type Category = 'competition' | 'community'| 'workshop' | 'social' | 'tech' | 'lecture';

export type Campus = {
  id: number;
  name: string;
  country: string;
  city: string;
};

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

// API functions to fetch data from 42 API
export const fetchToken = async () => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'client_credentials');
  formData.append('client_id', process.env.NEXT_PUBLIC_42_UID || '');
  formData.append('client_secret', process.env.FORTY_TWO_SECRET || '');

  const response = await fetch('https://api.intra.42.fr/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  const data = await response.json();
  return data.access_token;
};

export const fetchCampuses = async () => {
  try {
    const token = await fetchToken();
    const response = await fetch('https://api.intra.42.fr/v2/campus', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch campuses');
    }

    return await response.json() as Campus[];
  } catch (error) {
    console.error('Error fetching campuses:', error);
    return [];
  }
};

export const fetchCampusEvents = async (campusId: number) => {
  try {
    const token = await fetchToken();
    const response = await fetch(`https://api.intra.42.fr/v2/campus/${campusId}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events for campus ${campusId}`);
    }

    const apiEvents = await response.json();
    
    // Transform API events to match our Event type
    return apiEvents.map((event: any) => ({
      id: event.id,
      title: event.name,
      date: new Date(event.begin_at).toLocaleDateString(),
      time: `${new Date(event.begin_at).toLocaleTimeString()} - ${new Date(event.end_at).toLocaleTimeString()}`,
      location: event.location || 'No location specified',
      description: event.description,
      image: event.poster || "/api/placeholder/800/400",
      category: mapEventCategory(event.kind),
    }));
  } catch (error) {
    console.error(`Error fetching events for campus ${campusId}:`, error);
    return [];
  }
};

// Helper function to map 42 event kinds to our categories
const mapEventCategory = (kind: string): Category => {
  const mapping: Record<string, Category> = {
    'conference': 'lecture',
    'meet_up': 'social',
    'hackathon': 'competition',
    'workshop': 'workshop',
    // Add more mappings as needed
  };
  
  return mapping[kind.toLowerCase()] || 'social';
};

// Mock data for events (fallback)
export const mockEvents: Event[] = [
  // Your existing mock events
  {
    id: 1,
    title: "Hackathon Finals",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "42 Abu Dhabi, Main Campus",
    description: "Join us for the culmination of months of coding challenges. The top teams will present their projects to judges from leading tech companies.",
    image: "/api/placeholder/800/400",
    category: "competition" as Category
  },
  // ... other mock events
];

// Event filter component
export function EventFilters() {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200">
        All Events
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200">
        Competition
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200">
        Workshop
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200">
        Social
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200">
        Lecture
      </button>
    </div>
  );
}

// Event search component
export function EventSearch() {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search for events..."
      />
    </div>
  );
}

// EventCard component
export function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${
          event.category === 'competition' ? 'bg-red-100 text-red-800' : 
          event.category === 'workshop' ? 'bg-green-100 text-green-800' :
          event.category === 'social' ? 'bg-purple-100 text-purple-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </span>
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Clock className="h-4 w-4 mr-1" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <button className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-800">
          View details <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

// EventsPage component with real data fetching
export default function EventsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCampuses = async () => {
      const data = await fetchCampuses();
      setCampuses(data);
      
      if (data.length > 0) {
        setSelectedCampus(data[0].id);
      }
    };
    
    loadCampuses();
  }, []);
  
  useEffect(() => {
    const loadEvents = async () => {
      if (selectedCampus) {
        setIsLoading(true);
        try {
          const campusEvents = await fetchCampusEvents(selectedCampus);
          setEvents(campusEvents.length > 0 ? campusEvents : mockEvents);
        } catch (error) {
          console.error('Error loading events:', error);
          setEvents(mockEvents); // Fallback to mock data
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadEvents();
  }, [selectedCampus]);

  // Rest of your component remains the same, but you can add a campus selector
  // and loading state handling
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header code remains the same */}
      
      <main className="pt-24 px-4 pb-12 max-w-6xl mx-auto">
        {/* Page header */}
        {/* Search and filter */}
        <div className="mb-6">
          {/* <EventSearch /> */}
          <EventFilters />
        </div>
        {/* Campus selector */}
        {campuses.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Campus</label>
            <select 
              className="rounded-md border border-gray-300 py-2 px-3 text-sm w-full max-w-xs"
              value={selectedCampus || ''}
              onChange={(e) => setSelectedCampus(Number(e.target.value))}
            >
              {campuses.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.name} ({campus.city}, {campus.country})
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Search and filter */}
        <div className="mb-6">
          <EventSearch />
          <EventFilters />
        </div>
        
        {/* Events grid with loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        
        {/* Rest of your code (pagination, footer) remains the same */}
      </main>

      {/* Footer remains the same */}
    </div>
  );
}
