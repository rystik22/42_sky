"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../components/custom/client_component_wrapper";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Create a component that uses useSearchParams inside Suspense
function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get authorization code from URL
        const code = searchParams?.get("code");
        const accessToken = searchParams?.get("access_token");
        
        if (code && !accessToken) {
          // We have a code but no token - exchange code for token
          window.location.href = `/api/token_ex?code=${code}`;
          return; // Stop execution as we're redirecting
        }
        
        if (accessToken) {
          try {
            // We have the token directly in the URL
            // Decode the token to get user ID
            const decodedToken = jwtDecode<{ sub: string }>(accessToken);
            const userId = decodedToken.sub;
            
            // Fetch user data using our existing API endpoint
            const userResponse = await axios.get(`/api/user?id=${userId}&token=${accessToken}`);
            
            // Store user data
            const userData = userResponse.data;
            const user = {
              id: userData.id.toString(),
              name: userData.displayName || userData.login,
              login: userData.login,
              email: userData.email,
              avatar: userData.profileImage
            };
            
            // Store user data and token in cookies
            Cookies.set("userData", JSON.stringify(user), { expires: 7, sameSite: 'strict' });
            Cookies.set("accessToken", accessToken, { expires: 7, sameSite: 'strict' });
            
            // Update auth context
            login(null, user);
          } catch (err) {
            console.error("Error processing user data:", err);
            // Continue with redirect even if there's an error - the header will handle missing data
          }
          
          // Always redirect to landing page
          router.push("/");
        } else {
          // No code or token, just redirect to home
          router.push("/");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Even if there's an error, redirect to landing page
        router.push("/");
      }
    }
    
    handleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 w-full max-w-md">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-center text-white text-lg">Completing authentication...</p>
    </div>
  );
}

// Main component that uses Suspense
export default function CallbackPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <Suspense fallback={
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-center text-white text-lg">Loading...</p>
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </div>
  );
}