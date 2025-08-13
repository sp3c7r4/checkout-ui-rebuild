import { Menu, Bell, RefreshCw as Refresh } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

interface HeaderProps {
  business: any
  user: any
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  onRefresh?: () => void
}

const getPageTitle = (pathname: string) => {
  const titles: { [key: string]: { title: string, subtitle: string } } = {
    '/dashboard': { 
      title: 'Dashboard', 
      subtitle: 'Manage your supermarket efficiently' 
    },
    '/dashboard/products': { 
      title: 'Products', 
      subtitle: 'Manage your products' 
    },
    '/dashboard/orders': { 
      title: 'Orders', 
      subtitle: 'Manage your orders' 
    },
    '/dashboard/payments': { 
      title: 'Payments', 
      subtitle: 'Manage your payments' 
    },
    '/dashboard/carts': { 
      title: 'User Carts', 
      subtitle: 'Manage your user carts' 
    },
    '/dashboard/users': { 
      title: 'Users', 
      subtitle: 'Manage your users' 
    },
    '/dashboard/business': { 
      title: 'Business Info', 
      subtitle: 'Manage your business info' 
    },
    '/dashboard/qr': { 
      title: 'QR Store Link', 
      subtitle: 'Share your store with customers' 
    },
    '/dashboard/settings': { 
      title: 'Settings', 
      subtitle: 'Welcome to admin settings 😊' 
    },
  }
  
  return titles[pathname] || { title: 'Dashboard', subtitle: 'Manage your supermarket efficiently' }
}

export function Header({ business, user, sidebarOpen, setSidebarOpen, onRefresh }: HeaderProps) {
  const location = useLocation()
  const { title, subtitle } = getPageTitle(location.pathname)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    if (onRefresh) {
      await onRefresh()
    }
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Generate user initials
  const userInitials = user?.name 
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 bg-[#08080a] border-b border-gray-700 px-6 py-4 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <div>
            <h2 className="text-[17px] md:text-xl font-semibold text-white capitalize">
              {title}
            </h2>
            <p className="text-sm text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Online</span>
          </div>
          
          {/* Notification Bell */}
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div
            onClick={handleRefresh}
            className="w-fit px-3 gap-1 h-10 bg-[#202121] border-[#4a5565] border-1 to-amber-600 rounded-xl flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-[#2a2b2b] transition-colors"
          >
            <Refresh
              className={`w-5 h-auto text-amber-400 transition-transform duration-500 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span className='hidden md:block'>Refresh</span>
          </div>
          
          <div className='relative ml-7'>
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userInitials}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
