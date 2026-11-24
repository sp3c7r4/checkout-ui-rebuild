import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AppContext"
import { googleAuthEnabled } from "@/lib/auth-client";
import { uploadToS3, validateEmail } from "@/helper"
import { LoadingModal } from "@/components/ui/loading-modal"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"

interface SignupFormProps extends React.ComponentProps<"form"> {
  onSwitchToLogin?: () => void;
}

export function SignupForm({ className, onSwitchToLogin, ...props }: SignupFormProps) {
  const { signUpWithEmail, signInWithGoogle } = useAuth()
  const { toasts, toast, removeToast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", password: "", image: "", })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", "File size must be less than 5MB")
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Invalid file type", "Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setFormData(prev => ({
          ...prev,
          image: base64String
        }))
        setImagePreview(base64String)
        toast.success("Image uploaded", "Complete your registration")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})
    
    // Validate required fields
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error("Validation Error", "Please check the form and try again")
      return
    }

    setIsLoading(true)

    try {
      console.log("Signup data:", formData)
      const r = await validateEmail(formData.email)
      if (!r.success) return toast.error(`Error`, r.error as string)

      const image = formData.image ? await uploadToS3(formData.image) : undefined

      const result = await signUpWithEmail({...formData, image })
      
      if (result.success) {
        toast.success("Account Created!", `Welcome ${formData.name}! Your account has been created successfully.`)
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          image: "",
        })
        setImagePreview(null)
        setErrors({})
        
        // Redirect to login after a short delay
        setTimeout(() => {
          if (onSwitchToLogin) {
            onSwitchToLogin()
          }
        }, 2000) // 2 second delay to let user see the success message
      } else {
        toast.error("Sign Up Failed", result.error || "Failed to create account. Please try again.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Sign Up Failed", "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <LoadingModal isOpen={isLoading} message="Creating your account..." />
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground/50 text-sm text-balance">
            Enter your information below to create your account
          </p>
        </div>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={imagePreview || undefined} alt="Profile preview" />
            <AvatarFallback className="text-lg">
              <Camera className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <Label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-4 w-4" />
          </Label>
        </div>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground text-center">
          Click the camera icon to upload your profile picture<br />
          (Max size: 5MB, formats: JPG, PNG, GIF)
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            required 
            value={formData.name}
            onChange={handleChange("name")}
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="spectra@checkout.com" 
            required 
            value={formData.email}
            onChange={handleChange("email")}
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="Enter a strong password"
              required 
              value={formData.password}
              onChange={handleChange("password")}
              className={cn("pr-10", errors.password ? "border-red-500 focus-visible:ring-red-500" : "")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        {googleAuthEnabled && (
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
        )}
        {googleAuthEnabled && (
          <Button onClick={signInWithGoogle} variant="outline" className="w-full" type="button" disabled={isLoading}>
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isLoading ? "Please wait..." : "Login with Google"}
        </Button>
        )}
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button 
          type="button"
          onClick={onSwitchToLogin}
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </button>
      </div>
    </form>
    </>
  )
}
