interface LoadingModalProps {
  isOpen: boolean
  message?: string
}

export function LoadingModal({ isOpen, message = "Loading..." }: LoadingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div className="relative bg-background rounded-lg shadow-lg p-8 mx-4 max-w-sm w-full">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin border-t-white" />
          </div>
          
          {/* Loading Message */}
          <p className="text-sm text-muted-foreground text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
