import axios from 'axios';

export const getAccessToken = async () => {
  const res = await axios.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'client_credentials',
    client_id: 'u-s4t2ud-6f3cdacca8aaf46b80c284df7a5e2bbe5ecbd917793c49f49c8ed71d94569d08',
    client_secret: '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',
  });

  return res.data.access_token;
};