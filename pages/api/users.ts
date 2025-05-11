import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define user interface based on 42's API response
export interface User42 {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_first_name: string | null;
  url: string;
  phone: string | null;
  displayname: string;
  image: {
    link: string;
    versions?: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    }
  };
  staff?: boolean;
  kind?: string;
  correction_point: number;
  pool_month: string | null;
  pool_year: string | null;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date?: string;
  created_at: string;
  updated_at: string;
  alumnized_at: string | null;
  alumni: boolean;
  active?: boolean;
}

// Define a simplified interface for frontend use
interface FormattedUser {
  id: number;
  login: string;
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  profileImageVersions?: {
    large: string;
    medium: string;
    small: string;
    micro: string;
  };
  location: string | null;
  isStaff: boolean;
  userType: string;
  isAlumni: boolean;
  isActive: boolean;
  createdAt: string;
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
    
    // Get users for the Abu Dhabi campus
    const usersRes = await axios.get(`https://api.intra.42.fr/v2/campus/${campusId}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        // Customize these parameters based on your needs
        'page[size]': req.query.limit || 50,
        'page[number]': req.query.page || 1,
        // Optional filters
        ...(req.query.sort && { 'sort': req.query.sort }),
        ...(req.query.filter && { 'filter': req.query.filter }),
      }
    });

    // Format users for frontend use
    const formattedUsers: FormattedUser[] = usersRes.data.map((user: User42) => ({
      id: user.id,
      login: user.login,
      displayName: user.displayname,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profileImage: user.image?.link || '',
      profileImageVersions: user.image?.versions,
      location: user.location,
      isStaff: !!user.staff,
      userType: user.kind || 'student',
      isAlumni: !!user.alumni,
      isActive: user.active !== false, // Default to true if undefined
      createdAt: user.created_at,
    }));

    res.status(200).json({
      campusId,
      campusName: abuDhabiCampus.name,
      users: formattedUsers,
      totalCount: usersRes.headers['x-total'] || formattedUsers.length,
      page: parseInt(req.query.page as string) || 1,
      itemsPerPage: parseInt(req.query.limit as string) || 50,
    });
  } catch (err: any) {
    console.error('Error fetching campus users:', err);
    
    // Provide more detailed error information for debugging
    const errorResponse = {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      details: err.response?.data
    };
    
    res.status(500).json({ error: "Failed to fetch campus users", details: errorResponse });
  }
};

export default handler;