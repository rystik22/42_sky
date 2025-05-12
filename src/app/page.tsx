// filepath: c:\Users\Ranee\Desktop\42_sky\src\app\page.tsx
"use client";
import { AuthProvider } from './context/auth_provider';
import LandingPage from './landing-page/page';

export default function Home() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}