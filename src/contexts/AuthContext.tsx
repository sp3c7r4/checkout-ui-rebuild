import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import { betterAuth } from "better-auth";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: ({ name, email, password, image }:{ name: string, email: string, password: string, image?: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    authClient
      .getSession()
      .then((session) => {
        console.log("Session check result:", session); // Add logging
        if (session?.data) {
          setUser(session.data.user as any);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Session check error:", error);
        setLoading(false);
      });
  }, []);

  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:5173/dashboard", // Redirect to genie after login
      });
      return { success: true };
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Google. Please try again.";
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const signUpWithEmail = async ({ name, email, password, image }:{ name: string, email: string, password: string, image?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await authClient.signUp.email({
        name,
        email, // required
        password, // required
        image,
        callbackURL: "http://localhost:5173/dashboard",
    });
    
    if(error) {
      return { 
        success: false, 
        error: error.message || "Failed to create account. Please try again." 
      };
    }
    return { success: true };
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create account. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  const signInWithEmail = async(email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "http://localhost:5173/dashboard",
    });
    if(error) {
      return { 
        success: false, 
        error: error.message || "Invalid email or password. Please try again." 
      };
    }
    return { success: true };
    } catch (error: unknown) {
      console.error(`Sign in error:`, error);
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in. Please try again.";
      return { success: false, error: errorMessage };
    }
  }


  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      window.location.href = "/auth";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
