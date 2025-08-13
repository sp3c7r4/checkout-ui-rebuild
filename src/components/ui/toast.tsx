import * as React from "react"
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, title, description, type = "info", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isExiting, setIsExiting] = React.useState(false)
  const [progress, setProgress] = React.useState(100)

  React.useEffect(() => {
    // Trigger entrance animation
    const enterTimer = setTimeout(() => setIsVisible(true), 50)
    
    // Start progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100))
        if (newProgress <= 0) {
          clearInterval(progressInterval)
          return 0
        }
        return newProgress
      })
    }, 100)

    // Set up exit animation before removal
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onClose(id), 300) // Wait for exit animation
    }, duration - 300)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
      clearInterval(progressInterval)
    }
  }, [id, duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => onClose(id), 300)
  }

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[type]

  const styles = {
    success: "border-green-500/40 bg-green-500/20 text-green-50 backdrop-blur-md",
    error: "border-red-500/40 bg-red-500/20 text-red-50 backdrop-blur-md",
    warning: "border-yellow-500/40 bg-yellow-500/20 text-yellow-50 backdrop-blur-md",
    info: "border-blue-500/40 bg-blue-500/20 text-blue-50 backdrop-blur-md",
  }

  const progressColors = {
    success: "bg-green-400",
    error: "bg-red-400", 
    warning: "bg-yellow-400",
    info: "bg-blue-400",
  }

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-xl border relative overflow-hidden",
        "transition-all duration-300 ease-out transform-gpu",
        styles[type],
        // Use CSS classes for smoother animations
        isVisible && !isExiting ? "toast-enter opacity-100" : "",
        isExiting ? "toast-exit" : "",
        !isVisible && !isExiting ? "opacity-0 translate-x-full scale-95" : ""
      )}
      style={{
        transformOrigin: "right center"
      }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className={cn("h-full transition-all duration-100 ease-linear", progressColors[type])}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex items-start gap-3 p-4 pt-5">
        <Icon className={cn(
          "h-5 w-5 flex-shrink-0 mt-0.5 drop-shadow-sm text-white transition-all duration-200",
          isVisible && !isExiting && type === "success" ? "toast-bounce" : "",
          isVisible && !isExiting ? "animate-pulse" : ""
        )} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold leading-none drop-shadow-sm text-white">{title}</p>
          )}
          {description && (
            <p className={cn("text-sm opacity-90 drop-shadow-sm text-white/90", title ? "mt-1" : "")}>{description}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 rounded-lg p-1.5 hover:bg-white/10 active:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95 hover:rotate-90"
        >
          <X className="h-4 w-4 drop-shadow-sm text-white transition-transform duration-200" />
        </button>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Array<{
    id: string
    title?: string
    description?: string
    type?: "success" | "error" | "warning" | "info"
    duration?: number
  }>
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="transform transition-all duration-300 ease-out"
          style={{
            // Stagger animation delay for multiple toasts
            animationDelay: `${index * 100}ms`
          }}
        >
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  )
}
