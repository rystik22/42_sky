import axios from 'axios'
import { Event } from '../types/types'

// Format time to show hours:minutes
export const formatTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

// Map API event kind to category for consistent styling
export const mapKindToCategory = (kind: string): string => {
  const kindMap: Record<string, string> = {
    rush: "competition",
    association: "social",
    other: "lecture",
    meet_up: "social",
    hackathon: "competition",
    piscine: "workshop",
    event: "social"
  }
  
  return kindMap[kind] || kind
}

// Function to fetch events from our API endpoint
export const fetchEventsFromApi = async (): Promise<Event[]> => {
  try {
    // Use the events API endpoint we created
    const response = await axios.get('/api/events')
    
    if (!response.data || !response.data.events) {
      console.error("Invalid response from events API")
      return []
    }
    
    // Get the formatted events from response
    const { events } = response.data
    
    // Add images based on event category and ensure all required fields
    return events.map((event: any) => ({
      id: event.id,
      title: event.title,
      category: mapKindToCategory(event.category), // Map to our category system
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      image: getEventImage(event.category), // Generate image based on category
      beginAt: event.beginAt,
      endAt: event.endAt,
      maxAttendees: event.maxAttendees,
      currentAttendees: event.currentAttendees
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return fallbackEvents;
  }
}

// Helper function to get appropriate image based on event category
const getEventImage = (category: string): string => {
  const imageMap: Record<string, string> = {
    workshop: "/images/events/workshop.jpg",
    competition: "/images/events/competition.jpg",
    social: "/images/events/social.jpg", 
    lecture: "/images/events/lecture.jpg",
    meet_up: "/images/events/meetup.jpg",
    hackathon: "/images/events/hackathon.jpg",
    piscine: "/images/events/piscine.jpg",
    event: "/images/events/event.jpg"
  }
  
  return imageMap[category] || "/images/events/default-event.jpg"
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