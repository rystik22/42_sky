"use client";

import { ReactNode, useState, useEffect, createContext, useContext } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the User interface
interface User {
  id: string;
  name: string;
  login?: string;
  email?: string;
  avatar?: string;
}

// Define the Auth Context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (code: string | null, userData?: any) => Promise<void>;
  logout: () => void;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Client wrapper component
export default function ClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkUserSession = () => {
      try {
        const userDataCookie = Cookies.get("userData");
        if (userDataCookie) {
          setUser(JSON.parse(userDataCookie));
        }
      } catch (error) {
        console.error("Failed to restore user session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserSession();
  }, []);

  // Handle login - can either process a code or use pre-fetched userData
  const login = async (code: string | null, userData?: any): Promise<void> => {
    setIsLoading(true);
    try {
      // If userData is provided directly (from callback page), use it
      if (userData) {
        setUser(userData);
        return;
      }
      
      // If no userData but we have a code, fetch the token
      if (code) {
        // Redirect to the token exchange endpoint
        window.location.href = `/api/token_ex?code=${code}`;
        return; // Return early as we're redirecting
      }
      
      // If neither userData nor code, check for token in cookies
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        // Decode the token to get user ID
        const decodedToken = jwtDecode<{ sub: string }>(accessToken);
        const userId = decodedToken.sub;
        
        // Fetch user data
        const userResponse = await axios.get(`/api/user?id=${userId}&token=${accessToken}`);
        const apiUserData = userResponse.data;
        
        // Format user object
        const formattedUser = {
          id: apiUserData.id.toString(),
          name: apiUserData.displayName || apiUserData.login,
          login: apiUserData.login,
          email: apiUserData.email,
          avatar: apiUserData.profileImage
        };
        
        // Save user data
        Cookies.set("userData", JSON.stringify(formattedUser), { expires: 7, sameSite: 'strict' });
        setUser(formattedUser);
      } else {
        // No token found
        console.error("No authentication token found");
        throw new Error("Authentication failed - no token available");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    Cookies.remove("userData");
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };