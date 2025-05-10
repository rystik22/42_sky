// pages/api/campus.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get access token
    const tokenRes = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'client_credentials',
      client_id: process.env.NEXT_PUBLIC_42_UID,
      client_secret: process.env.FORTY_TWO_SECRET,
    });

    const accessToken = tokenRes.data.access_token;
    
    // First, get all campuses
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
    
    // Get detailed information about Abu Dhabi campus
    const campusRes = await axios.get(`https://api.intra.42.fr/v2/campus/${campusId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.status(200).json({
      campusId,
      campusDetails: campusRes.data
    });
  } catch (err: any) {
    console.error('Error fetching campus data:', err);
    res.status(500).json({ error: err.message });
  }
};

export default handler;