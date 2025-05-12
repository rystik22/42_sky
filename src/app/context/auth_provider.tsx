import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // You'll need to install this

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  login?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to restore user session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserSession();
  }, []);

  // Handle 42 OAuth login using only GET requests
  const login = async (code: string) => {
    setIsLoading(true);
    try {
      // Exchange the code for a token - Note: This is handled by the server-side callback
      // We are assuming the token is fetched via another mechanism and sent in the URL
      // For example, redirect URL contains the token as a fragment/query param
      
      // Fetch the token from the URL (you'll need to pass it as a parameter)
      // This is a simplification - you would need to adjust based on how you pass the token
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      
      if (!accessToken) {
        throw new Error("No access token found");
      }
      
      // Decode the token to get user ID
      const decodedToken = jwtDecode<{ sub: string }>(accessToken);
      const userId = decodedToken.sub;
      
      // Call the API to get user details using GET with query params
      const userResponse = await axios.get(`/api/user?id=${userId}&token=${accessToken}`);
      
      // Extract relevant user data
      const userData = userResponse.data;
      const user = {
        id: userData.id.toString(),
        name: userData.displayName || userData.login,
        login: userData.login,
        email: userData.email,
        avatar: userData.profileImage
      };
      
      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}