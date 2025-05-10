import axios from 'axios';

export const get42AuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_42_UID!;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI!);
  return `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;
};

export const getAccessToken = async () => {
  const res = await axios.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'client_credentials',
    client_id: process.env.NEXT_PUBLIC_42_UID,
    client_secret: process.env.FORTY_TWO_SECRET,
  });

  return res.data.access_token;
};
