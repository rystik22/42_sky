import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    // Exchange code for token with 42 API
    const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_42_UID,
      client_secret: process.env.FORTY_TWO_SECRET,
      code: code,
      redirect_uri: 'https://42sky.vercel.app/auth/callback'
    });

    const { access_token } = tokenResponse.data;

    // Redirect back to callback with token
    res.redirect(`/auth/callback?access_token=${access_token}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}