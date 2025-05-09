export const get42AuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_42_UID!;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI!);
  return `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;
};
