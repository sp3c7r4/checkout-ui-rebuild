import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useAuth } from "@/contexts/AppContext";
import { LoadingModal } from "@/components/ui/loading-modal"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"
// import env from "@/config/env";

interface LoginFormProps extends React.ComponentProps<"form"> {
  onSwitchToSignup?: () => void;
}

export function LoginForm({ className, onSwitchToSignup, ...props }: LoginFormProps) {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const { toasts, toast, removeToast } = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(import.meta.env)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({})
    
    // Validate required fields
    const newErrors: Record<string, string> = {}
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error("Validation Error", "Please check the form and try again")
      return
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmail(formData.email, formData.password);
      if (result.success) {
        toast.success("Welcome back!", "You have been successfully signed in.")
      } else {
        toast.error("Sign In Failed", result.error || "Invalid email or password.")
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Sign In Failed", "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      console.log(result)
      if (result.success) {
        toast.success("Welcome!", "You are being redirected...")
      } else {
        toast.error("Google Sign In Failed", result.error || "Failed to sign in with Google.")
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google Sign In Failed", "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <LoadingModal isOpen={isLoading} message="Signing you in..." />
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleEmailLogin} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground/50 text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="spectra@checkout.com" 
              required 
              value={formData.email}
              onChange={handleInputChange("email")}
              disabled={isLoading}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                required 
                value={formData.password}
                onChange={handleInputChange("password")}
                disabled={isLoading}
                className={cn("pr-10", errors.password ? "border-red-500 focus-visible:ring-red-500" : "")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button onClick={handleGoogleLogin} variant="outline" className="w-full" type="button" disabled={isLoading}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? "Please wait..." : "Login with Google"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <button 
            type="button"
            onClick={onSwitchToSignup}
            className="underline underline-offset-4 hover:text-primary"
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  )
}
