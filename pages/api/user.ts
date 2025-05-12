import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { User42 } from './users';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if there's an ID in the request
  const { id, token } = req.query;
  
  if (!id || !token) {
    return res.status(400).json({ error: 'User ID and token are required' });
  }
  
  try {
    // Make request to 42 API
    const userRes = await axios.get(`https://api.intra.42.fr/v2/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const userData = userRes.data;
    
    // Format user for frontend use
    const formattedUser: FormattedUser = {
      id: userData.id,
      login: userData.login,
      displayName: userData.displayname,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      profileImage: userData.image?.link || '',
      profileImageVersions: userData.image?.versions,
      location: userData.location,
      isStaff: !!userData.staff,
      userType: userData.kind || 'student',
      isAlumni: !!userData.alumni,
      isActive: userData.active !== false, 
      createdAt: userData.created_at,
    };

    return res.status(200).json(formattedUser);
  } catch (err: any) {
    console.error('Error fetching user:', err);
    
    const errorResponse = {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      details: err.response?.data
    };
    
    return res.status(500).json({ error: "Failed to fetch user", details: errorResponse });
  }
}