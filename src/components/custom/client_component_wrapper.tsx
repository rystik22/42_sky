"use client";

import { ReactNode, useState, useEffect, createContext, useContext } from "react";

// Define the User interface
interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

// Define the Auth Context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (code: string) => Promise<void>;
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

  // Handle login
  const login = async (code: string): Promise<void> => {
    setIsLoading(true);
    try {
      // For demo purposes, simulate authentication with the 42 API
      console.log("Processing authentication code:", code);
      
      // Simulate successful login with mock data
      const user = {
        id: "42_user_id",
        name: "42 Student",
        email: "student@42abudhabi.ae",
        avatar: "https://cdn.intra.42.fr/users/medium_default.png"
      };
      
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
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

export { AuthContext };