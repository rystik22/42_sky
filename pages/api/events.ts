import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define event interface
export interface Event42 {
  id: number;
  name: string;
  description: string;
  location: string;
  kind: string;
  max_people: number | null;
  nbr_subscribers: number;
  begin_at: string;
  end_at: string;
  campus_ids: number[];
  cursus_ids: number[];
  created_at: string;
  updated_at: string;
  prohibition_of_cancellation: number;
  waitlist: null | any;
  themes: any[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get access token
    const tokenRes = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'client_credentials',
      client_id: process.env.NEXT_PUBLIC_42_UID,
      client_secret: process.env.FORTY_TWO_SECRET,
    });

    const accessToken = tokenRes.data.access_token;
    
    // First, get all campuses to find Abu Dhabi campus ID
    const allCampusesRes = await axios.get('https://api.intra.42.fr/v2/campus', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    // Find Abu Dhabi campus
    const abuDhabiCampus = allCampusesRes.data.find(
      (campus: any) => campus.name === "Abu Dhabi"
    );
    
    if (!abuDhabiCampus) {
      return res.status(404).json({ error: "Abu Dhabi campus not found" });
    }
    
    const campusId = abuDhabiCampus.id;
    
    // Get events for Abu Dhabi campus
    const eventsRes = await axios.get(`https://api.intra.42.fr/v2/campus/${campusId}/events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        // Filter for upcoming events (you can modify these parameters as needed)
        'filter[future]': true,
        // Sort by start date
        'sort': 'begin_at',
        // Limit the number of events returned
        'page[size]': 20
      }
    });

    // Transform events data to a more friendly format
    const formattedEvents = eventsRes.data.map((event: Event42) => ({
      id: event.id,
      title: event.name,
      description: event.description,
      location: event.location,
      category: event.kind,
      date: formatDate(event.begin_at),
      time: formatTimeRange(event.begin_at, event.end_at),
      beginAt: event.begin_at,
      endAt: event.end_at,
      maxAttendees: event.max_people,
      currentAttendees: event.nbr_subscribers
    }));

    res.status(200).json({
      events: formattedEvents,
      rawEvents: eventsRes.data, // Include raw data for debugging
      campusId
    });
  } catch (err: any) {
    console.error('Error fetching events data:', err);
    res.status(500).json({ error: err.message });
  }
};

// Helper function to format date from API
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Helper function to format time range
function formatTimeRange(beginAt: string, endAt: string): string {
  const startDate = new Date(beginAt);
  const endDate = new Date(endAt);
  
  const startHours = startDate.getHours().toString().padStart(2, '0');
  const startMinutes = startDate.getMinutes().toString().padStart(2, '0');
  const endHours = endDate.getHours().toString().padStart(2, '0');
  const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
  
  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
}

export default handler;