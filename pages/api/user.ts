import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, token } = req.query;

  if (!id || !token) {
    return res.status(400).json({ error: 'User ID and token are required' });
  }

  try {
    // Get user details from the 42 API
    const userResponse = await axios.get(`https://api.intra.42.fr/v2/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Format user data for frontend
    const userData = userResponse.data;
    const formattedUser = {
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
      isActive: userData.active !== false
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ error: 'Failed to fetch user details' });
  }
}