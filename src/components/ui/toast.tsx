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
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

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

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-xl border transition-all duration-300",
        styles[type]
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5 drop-shadow-sm text-white" />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold leading-none drop-shadow-sm text-white">{title}</p>
          )}
          {description && (
            <p className={cn("text-sm opacity-90 drop-shadow-sm text-white/90", title ? "mt-1" : "")}>{description}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 rounded-lg p-1.5 hover:bg-white/10 active:bg-white/20 transition-all duration-200"
        >
          <X className="h-4 w-4 drop-shadow-sm text-white" />
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
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
