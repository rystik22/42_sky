import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }
  
  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_42_UID,
      client_secret: process.env.FORTY_TWO_SECRET,
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || 'https://42sky.vercel.app/auth/callback'
    });
    
    const { access_token } = tokenResponse.data;
    
    // Redirect back to the callback URL with the access token
    res.redirect(`/auth/callback?access_token=${access_token}`);
  } catch (error: any) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to exchange code for token',
      details: error.response?.data || error.message
    });
  }
}