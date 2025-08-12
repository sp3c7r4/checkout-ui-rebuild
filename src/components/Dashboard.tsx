import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BusinessRegistrationModal } from "@/components/BusinessRegistrationModal"
import { RagSourcesModal } from "@/components/RagSourcesModal"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false)
  const [isRagModalOpen, setIsRagModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState("Dashboard")
  
  // Listen for navigation events from sidebar
  useEffect(() => {
    const handleNavEvent = (event: CustomEvent) => {
      setCurrentView(event.detail.view)
    }
    
    window.addEventListener('navigate', handleNavEvent as EventListener)
    return () => window.removeEventListener('navigate', handleNavEvent as EventListener)
  }, [])

  // Render different content based on current view
  const renderContent = () => {
    switch (currentView) {
      case "Analytics":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
            <p className="text-muted-foreground">Analytics content will be displayed here</p>
          </div>
        )
      case "Data Library":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Data Library</h2>
            <p className="text-muted-foreground">Data library content will be displayed here</p>
          </div>
        )
      case "Word Assistant":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Word Assistant</h2>
            <p className="text-muted-foreground">Word assistant content will be displayed here</p>
          </div>
        )
      case "Settings":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel will be displayed here</p>
          </div>
        )
      case "Get Help":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
            <p className="text-muted-foreground">Help documentation and support will be displayed here</p>
          </div>
        )
      default:
        return (
          <>
            <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div 
                className="bg-muted/50 aspect-video rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setIsBusinessModalOpen(true)}
              />

              <div 
                className="bg-muted/50 aspect-video rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setIsRagModalOpen(true)}
              />

              <div 
                className="bg-muted/50 aspect-video rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {/* Add analytics functionality here */}}
              />
            </div>
          </>
        )
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Qwik
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentView}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderContent()}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
          </div>
        </div>
      </SidebarInset>
      
      {/* Business Registration Modal */}
      <BusinessRegistrationModal 
        isOpen={isBusinessModalOpen} 
        onClose={() => setIsBusinessModalOpen(false)} 
      />
      
      {/* RAG Sources Modal */}
      <RagSourcesModal 
        isOpen={isRagModalOpen} 
        onClose={() => setIsRagModalOpen(false)} 
      />
    </SidebarProvider>
  )
}
