import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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

  // Handle 42 OAuth login
  const login = async (code: string) => {
    setIsLoading(true);
    try {
      // Exchange the code for a token
      const tokenResponse = await axios.post('/api/auth/token', { code });
      const { access_token } = tokenResponse.data;
      
      // Decode the token to get user ID
      const decodedToken = jwtDecode<{ sub: string }>(access_token);
      const userId = decodedToken.sub;
      
      // Call the API to get user details
      const userResponse = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
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
      localStorage.setItem("accessToken", access_token);
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