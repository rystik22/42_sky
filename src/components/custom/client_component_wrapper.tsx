"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  login?: string;
  email?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (code?: string, userData?: User) => Promise<void>;
  logout: () => void;
}

// Safe localStorage function that checks if window exists
function safeLocalStorage(operation: 'get' | 'set' | 'remove', key: string, value?: any) {
  if (typeof window !== 'undefined') {
    if (operation === 'get') {
      return localStorage.getItem(key);
    } else if (operation === 'set' && value !== undefined) {
      localStorage.setItem(key, value);
    } else if (operation === 'remove') {
      localStorage.removeItem(key);
    }
  }
  return null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkExistingSession = () => {
      // Try to get user data from localStorage
      const storedUser = safeLocalStorage('get', 'userData');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user data");
          safeLocalStorage('remove', 'userData');
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (code?: string, userData?: User) => {
    setIsLoading(true);
    
    try {
      // If user data is directly provided, use that
      if (userData) {
        setUser(userData);
        safeLocalStorage('set', 'userData', JSON.stringify(userData));
        return;
      }
      
      // If we have a code but no user data, that means we need to
      // exchange the code for a token via our API route
      if (code) {
        // Redirect to the token exchange endpoint
        window.location.href = `/api/token_ex?code=${code}`;
        return;
      }
      
      // Check if we have a token in localStorage (might be after a page refresh)
      const token = safeLocalStorage('get', 'accessToken');
      
      if (token) {
        try {
          // Decode the token to get the user ID
          const decoded = jwtDecode<{ sub: string }>(token);
          const userId = decoded.sub;
          
          // Call our API to get user details
          const userResponse = await axios.get(`/api/user?id=${userId}&token=${token}`);
          
          // Format the user data and save it
          const userData = userResponse.data;
          const user = {
            id: userData.id.toString(),
            name: userData.displayName || userData.login,
            login: userData.login,
            email: userData.email,
            avatar: userData.profileImage
          };
          
          setUser(user);
          safeLocalStorage('set', 'userData', JSON.stringify(user));
        } catch (error) {
          console.error("Failed to verify token or get user data:", error);
          // Clear the invalid token
          safeLocalStorage('remove', 'accessToken');
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    safeLocalStorage('remove', 'userData');
    safeLocalStorage('remove', 'accessToken');
    
    // You might also want to clear cookies
    if (typeof Cookies !== 'undefined') {
      Cookies.remove('userData');
      Cookies.remove('accessToken');
    }
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

export default AuthProvider;