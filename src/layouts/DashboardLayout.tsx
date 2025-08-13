import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { useDashboard } from '@/contexts/AppContext'
import { DashboardRoutes } from '@/routes/DashboardRoutes'

interface DashboardLayoutProps {
  business: any
  user: any
}

export function DashboardLayout({ business, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dashboardData = useDashboard()

  return (
    <div className="min-h-screen bg-[#08080a]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        business={dashboardData.business}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        products={dashboardData.products}
        carts={dashboardData.carts}
        orders={dashboardData.orders}
        payments={dashboardData.payments}
      />

      {/* Main content area */}
      <div className="lg:ml-72">
        {/* Header */}
        <Header 
          business={dashboardData.business}
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onRefresh={dashboardData.refetch}
        />
        
        {/* Main content with proper top padding to account for fixed header */}
        <main className="p-6 flex-1 overflow-y-auto pt-35 md:pt-25">
          <DashboardRoutes />
        </main>
      </div>
    </div>
  )
}
