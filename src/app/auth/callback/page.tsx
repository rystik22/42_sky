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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      try {
        // Check for error first
        const errorMsg = searchParams?.get("error");
        if (errorMsg) {
          setError(`Authentication failed: ${errorMsg}`);
          setIsLoading(false);
          return;
        }
        
        // Get authorization code from URL
        const code = searchParams?.get("code");
        const accessToken = searchParams?.get("access_token");
        
        if (code && !accessToken) {
          // We have a code but no token - exchange code for token
          // FIXED: This should call the token exchange API, not redirect to auth again
          window.location.href = `/api/token_ex?code=${code}`;
          return; // Stop execution as we're redirecting
        }
        
        if (accessToken) {
          // We have the token directly in the URL
          // Decode the token to get user ID
          const decodedToken = jwtDecode<{ sub: string }>(accessToken);
          const userId = decodedToken.sub;
          
          // Fetch user data using our existing API endpoint with GET parameters
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
          
          // Store user data and token in cookies (7 day expiry)
          Cookies.set("userData", JSON.stringify(user), { expires: 7, sameSite: 'strict' });
          Cookies.set("accessToken", accessToken, { expires: 7, sameSite: 'strict' });
          
          // Call the login method with the user data to update auth context
          await login(null, user);
          
          // Redirect to home page
          router.push("/");
        } else {
          setError("No authorization code or access token provided");
        }
      } catch (error: any) {
        console.error("Authentication error:", error);
        // Provide more detailed error information
        if (error.response) {
          setError(`Authentication failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else {
          setError("Failed to complete authentication");
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    handleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 w-full max-w-md">
      {isLoading ? (
        <>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-center text-white text-lg">Completing authentication...</p>
        </>
      ) : error ? (
        <>
          <h2 className="text-red-400 text-xl mb-4 text-center">Authentication Error</h2>
          <p className="text-white/70 text-center mb-6">{error}</p>
          <button 
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
          </button>
        </>
      ) : null}
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