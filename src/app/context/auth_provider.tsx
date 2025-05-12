"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
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
        // Get user data from localStorage (you might want to use cookies in production)
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
      // In a real app, you would exchange the code for a token with your backend
      // For demo purposes, we'll simulate a successful login with mock data
      const user = {
        id: "42_user_id",
        name: "42 Student",
        email: "student@42abudhabi.ae",
        avatar: "https://cdn.intra.42.fr/users/medium_default.png"
      };
      
      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(user));
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