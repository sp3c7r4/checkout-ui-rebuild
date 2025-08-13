import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authClient } from "../lib/auth-client";
import { useToast } from "@/hooks/use-toast";
import { ToastContainer } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/utils/Toast";

// Theme types
type Theme = "dark" | "light" | "system";

// Consolidated interfaces
interface AppState {
  // Auth state
  user: any | null;
  business: any;
  spreadsheet: any;
  settings: any;
  loading: boolean;
  
  // Dashboard state
  products: any[];
  carts: any[];
  payments: any[];
  orders: any[];
  users: any[];
  isLoading: boolean;
  error: any;
  
  // Theme state
  theme: Theme;
  
  // Toast state - handled internally, exposed via methods
}

interface AppActions {
  // Auth actions
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: ({ name, email, password, image }: { name: string, email: string, password: string, image?: string }) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  setSpreadsheet: (spreadsheet: any) => void;
  setSettings: (settings: any) => void;
  setBusiness: (business: any) => void;
  
  // Dashboard actions
  refetch: () => void;
  
  // Theme actions
  setTheme: (theme: Theme) => void;
  
  // Toast actions
  toast: {
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
  };
  removeToast: (id: string) => void;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | undefined>(undefined);

// Persistence utilities
const STORAGE_KEY = 'app-storage';
const THEME_STORAGE_KEY = 'app-theme';

const saveToStorage = (data: Partial<AppState>) => {
  try {
    const existingData = getFromStorage();
    const newData = { ...existingData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
    console.error('Failed to save app data to localStorage:', error);
  }
};

const getFromStorage = (): Partial<AppState> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load app data from localStorage:', error);
    return {};
  }
};

const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear app data from localStorage:', error);
  }
};

// Theme utilities
const getThemeFromStorage = (): Theme => {
  try {
    return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "system";
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error);
    return "system";
  }
};

const saveThemeToStorage = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage
  const storedData = getFromStorage();
  const storedTheme = getThemeFromStorage();
  
  // Auth state
  const [user, setUser] = useState(storedData.user || null);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(storedData.business || null);
  const [spreadsheet, setSpreadsheet] = useState(storedData.spreadsheet || null);
  const [settings, setSettings] = useState(storedData.settings || null);
  
  // Dashboard state
  const [products, setProducts] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  // Theme state
  const [theme, setThemeState] = useState<Theme>(storedTheme);
  
  // Toast functionality
  const { toasts, toast, removeToast } = useToast();
  const queryClient = useQueryClient();

  // Enhanced setters that persist to localStorage
  const updateUser = useCallback((newUser: any) => {
    setUser(newUser);
    saveToStorage({ user: newUser });
  }, []);

  const updateBusiness = useCallback((newBusiness: any) => {
    setBusiness(newBusiness);
    saveToStorage({ business: newBusiness });
  }, []);

  const updateSpreadsheet = useCallback((newSpreadsheet: any) => {
    setSpreadsheet(newSpreadsheet);
    saveToStorage({ spreadsheet: newSpreadsheet });
  }, []);

  const updateSettings = useCallback((newSettings: any) => {
    setSettings(newSettings);
    saveToStorage({ settings: newSettings });
  }, []);

  // Theme management
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    saveThemeToStorage(newTheme);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Dashboard actions
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["settings"] });
      Toast("Data refreshed successfully!", false);
    } catch (error) {
      console.error("Refresh failed:", error);
      Toast("Failed to refresh data", true);
    } finally {
      setIsLoading(false);
    }
  }, [queryClient]);

  // Check for existing session on mount
  useEffect(() => {
    authClient
      .getSession()
      .then((session) => {
        console.log("Session check result:", session);
        if (session?.data) {
          updateUser(session.data.user as any);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Session check error:", error);
        setLoading(false);
      });
  }, [updateUser]);

  // Auth actions
  const signInWithGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`,
      });
      
      if (result?.data?.user) {
        updateUser(result.data.user);
      }
      
      return { success: true };
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Google. Please try again.";
      return { success: false, error: errorMessage };
    }
  }, [updateUser]);

  const signUpWithEmail = useCallback(async ({ name, email, password, image }: { name: string, email: string, password: string, image?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error, data } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: `${window.location.origin}/dashboard`,
      });
      
      if (error) {
        return { 
          success: false, 
          error: error.message || "Failed to create account. Please try again." 
        };
      }

      if (data?.user) {
        updateUser(data.user);
      }
      
      return { success: true };
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create account. Please try again.";
      return { success: false, error: errorMessage };
    }
  }, [updateUser]);

  const signInWithEmail = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error, data } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: `${window.location.origin}/dashboard`,
      });
      
      if (error) {
        return { 
          success: false, 
          error: error.message || "Invalid email or password. Please try again." 
        };
      }

      if (data?.user) {
        updateUser(data.user);
      }

      return { success: true };
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in. Please try again.";
      return { success: false, error: errorMessage };
    }
  }, [updateUser]);

  const signOut = useCallback(async () => {
    try {
      await authClient.signOut();
      // Clear all persisted data
      updateUser(null);
      updateBusiness(null);
      updateSpreadsheet(null);
      updateSettings(null);
      clearStorage();
      window.location.href = "/auth";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, [updateUser, updateBusiness, updateSpreadsheet, updateSettings]);

  const contextValue: AppContextType = {
    // Auth state
    user,
    business,
    spreadsheet,
    settings,
    loading,
    
    // Dashboard state
    products,
    carts,
    payments,
    orders,
    users,
    isLoading,
    error,
    
    // Theme state
    theme,
    
    // Auth actions
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    setSpreadsheet: updateSpreadsheet,
    setSettings: updateSettings,
    setBusiness: updateBusiness,
    
    // Dashboard actions
    refetch: handleRefresh,
    
    // Theme actions
    setTheme,
    
    // Toast actions
    toast,
    removeToast,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </AppContext.Provider>
  );
}

// Custom hooks for different concerns
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Specific hooks for different domains (optional - for better organization)
export const useAuth = () => {
  const context = useApp();
  return {
    user: context.user,
    business: context.business,
    spreadsheet: context.spreadsheet,
    settings: context.settings,
    loading: context.loading,
    signInWithEmail: context.signInWithEmail,
    signUpWithEmail: context.signUpWithEmail,
    signInWithGoogle: context.signInWithGoogle,
    signOut: context.signOut,
    setSpreadsheet: context.setSpreadsheet,
    setSettings: context.setSettings,
    setBusiness: context.setBusiness,
  };
};

export const useDashboard = () => {
  const context = useApp();
  return {
    business: context.business,
    products: context.products,
    carts: context.carts,
    payments: context.payments,
    orders: context.orders,
    users: context.users,
    isLoading: context.isLoading,
    error: context.error,
    refetch: context.refetch,
  };
};

export const useTheme = () => {
  const context = useApp();
  return {
    theme: context.theme,
    setTheme: context.setTheme,
  };
};

export const useDashboardToast = () => {
  const context = useApp();
  return {
    toast: context.toast,
    removeToast: context.removeToast,
  };
};
