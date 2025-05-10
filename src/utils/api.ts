import axios from 'axios'
import { Event } from '../types/types'

// Helper function to format date from API
export const formatDateString = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

// Helper function to format time range from API
export const formatTimeRange = (beginAt: string, endAt: string) => {
  const startDate = new Date(beginAt)
  const endDate = new Date(endAt)
  
  const startHours = startDate.getHours().toString().padStart(2, '0')
  const startMinutes = startDate.getMinutes().toString().padStart(2, '0')
  const endHours = endDate.getHours().toString().padStart(2, '0')
  const endMinutes = endDate.getMinutes().toString().padStart(2, '0')
  
  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
}

// Map API event kind to category
export const mapKindToCategory = (kind: string): string => {
  const kindMap: Record<string, string> = {
    rush: "competition",
    association: "social",
    other: "lecture"
  }
  
  return kindMap[kind] || kind
}

// Format time to show hours:minutes
export const formatTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

// Function to fetch events from the 42 API
export const fetchEventsFromApi = async (): Promise<Event[]> => {
  try {
    // Fetch all campuses using the client credentials directly
    const campusesResponse = await axios.get("https://api.intra.42.fr/v2/campus", {
      auth: {
        username: process.env.NEXT_PUBLIC_42_UID || '',
        password: process.env.FORTY_TWO_SECRET || ''
      }
    });

    const campusesData = campusesResponse.data;
    const abuDhabiCampus = campusesData.find((campus: any) => campus.name === "Abu Dhabi");

    if (!abuDhabiCampus) {
      console.error("Abu Dhabi campus not found");
      return [];
    }

    // Fetch events for Abu Dhabi campus using the same auth method
    const eventsResponse = await axios.get(`https://api.intra.42.fr/v2/campus/${abuDhabiCampus.id}/events`, {
      auth: {
        username: process.env.NEXT_PUBLIC_42_UID || '',
        password: process.env.FORTY_TWO_SECRET || ''
      }
    });

    const eventsData = eventsResponse.data;
    
    // Transform API events to match our Event type
    return eventsData.map((event: any) => ({
      id: event.id,
      title: event.name,
      category: mapKindToCategory(event.kind),
      date: formatDateString(event.begin_at),
      time: formatTimeRange(event.begin_at, event.end_at),
      location: event.location,
      description: event.description,
      image: "/images/events/default-event.jpg", // Default image as API doesn't provide images
    })).sort((a: Event, b: Event) => {
      // Sort by date (assuming date format is "MMM DD")
      const dateA = new Date(a.date + ", 2025");
      const dateB = new Date(b.date + ", 2025");
      return dateA.getTime() - dateB.getTime();
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

// Sample fallback events if API fetch fails
export const fallbackEvents: Event[] = [
  {
    id: 1,
    title: "Introduction to AI",
    category: "workshop",
    date: "May 15",
    time: "14:00 - 16:00",
    location: "Lab 1",
    description: "Learn the basics of artificial intelligence and machine learning.",
    image: "/images/events/ai-workshop.jpg",
  },
  {
    id: 2,
    title: "Hackathon Finals",
    category: "competition",
    date: "May 18",
    time: "09:00 - 18:00",
    location: "Main Hall",
    description: "Final presentations of the annual hackathon projects.",
    image: "/images/events/hackathon.jpg",
  },
  {
    id: 3,
    title: "Community Mixer",
    category: "social",
    date: "May 20",
    time: "19:00 - 21:00",
    location: "Lounge Area",
    description: "Network with fellow students and industry professionals.",
    image: "/images/events/mixer.jpg",
  },
  {
    id: 4,
    title: "Industry Expert Talk",
    category: "lecture",
    date: "May 22",
    time: "13:00 - 14:30",
    location: "Auditorium",
    description: "Hear from leading experts in the tech industry.",
    image: "/images/events/expert-talk.jpg",
  }
]