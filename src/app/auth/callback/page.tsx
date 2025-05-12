"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/auth_provider";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams?.get("code");
    
    async function handleCallback() {
      if (code) {
        try {
          await login(code);
          router.push("/"); // Redirect to home page after login
        } catch (err) {
          setError("Authentication failed. Please try again.");
        }
      } else {
        setError("No authentication code received from 42.");
      }
    }
    
    handleCallback();
  }, [searchParams, login, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl mb-4">Login Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900/70 border border-white/10 rounded-lg p-8 max-w-md text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl mb-2">Logging you in...</h2>
        <p className="text-white/60">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}