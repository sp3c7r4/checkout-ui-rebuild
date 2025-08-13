import { NavLink, useLocation } from 'react-router-dom'
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  Building2, 
  QrCode, 
  DollarSign,
  Star,
  Settings2
} from 'lucide-react'
import { useAuth } from '@/contexts/AppContext'
import logo from '@/assets/logo.png'

interface SidebarProps {
  business: any
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  products?: any[]
  carts?: any[]
  orders?: any[]
  payments?: any[]
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard', exact: true },
  { icon: Package, label: 'Products', path: '/dashboard/products' },
  { icon: ShoppingCart, label: 'User Carts', path: '/dashboard/carts' },
  { icon: Star, label: 'Orders', path: '/dashboard/orders' },
  { icon: DollarSign, label: 'Payments', path: '/dashboard/payments' },
  { icon: Users, label: 'Users', path: '/dashboard/users' },
  { icon: Building2, label: 'Business Info', path: '/dashboard/business' },
  { icon: QrCode, label: 'QR Store Link', path: '/dashboard/qr' },
  { icon: Settings2, label: 'Settings', path: '/dashboard/settings' },
]
 export function Sidebar({ business, sidebarOpen, setSidebarOpen, products = [], carts = [], orders = [], payments = [] }: SidebarProps) {
  const location = useLocation()
  const { signOut } = useAuth()

  async function handleLogout() {
    signOut();
  }

  const getBadgeCount = (path: string) => {
    switch (path) {
      case '/dashboard/products':
        return products.length > 0 ? products.length : null
      case '/dashboard/carts':
        return carts.length > 0 ? carts.length : null
      case '/dashboard/orders':
        return orders.filter((order: any) => order.status === 'pending').length > 0 
          ? orders.filter((order: any) => order.status === 'pending').length 
          : null
      case '/dashboard/payments':
        return payments.length > 0 ? payments.length : null
      default:
        return null
    }
  }

  const MenuItem = ({ icon: Icon, label, path, exact = false }: { 
    icon: any
    label: string
    path: string
    exact?: boolean
  }) => {
    const isActive = exact ? location.pathname === path : location.pathname.startsWith(path)
    const badge = getBadgeCount(path)

    return (
      <NavLink
        to={path}
        onClick={() => setSidebarOpen(false)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
          isActive
            ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg"
            : "text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon size={20} />
          <span className="font-medium">{label}</span>
        </div>
        {badge && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-amber-600 text-white"
            }`}
          >
            {badge}
          </span>
        )}
      </NavLink>
    )
  }

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-72 bg-[#08080a] z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:fixed lg:h-screen border-r border-gray-700`}
    >
      {/* Logo Section */}
      <div className="p-4 px-10 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img src={logo} className='w-auto h-10'/>
          <div className="flex flex-col gap-0">
            <h2 className="text-lg font-bold text-white">Checkout</h2>
            <p className="text-sm text-gray-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-3">
        {navigationItems.map((item) => (
          <MenuItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            exact={item.exact}
          />
        ))}
        </nav>

          <div className="absolute bottom-25 left-6 right-6">
            <div className="hidden md:block bg-gradient-to-r from-yellow-500/10 to-amber-600/10 border border-amber-600/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-400">
                  Pro Version
                </span>
              </div>
              <p className="text-xs text-gray-400">
                You're using the professional dashboard
              </p>
            </div>
            <button
              title="Logout"
              onClick={handleLogout}
              className="py-5 px-10 w-full rounded-lg mt-3 text-white bg-red-600 transform transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>

      {/* Business Info at Bottom */}
      {business && (
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700 bg-[#08080a]">
          <div className="text-xs text-gray-400">
            <p className="font-medium text-white">{business.name}</p>
            <p>{business.email}</p>
          </div>
        </div>
      )}
    </div>
  )
}
