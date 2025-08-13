import { Link } from 'react-router-dom'
import { Package, ShoppingCart, DollarSign, Star, TrendingUp, Building2 } from 'lucide-react'
import { useDashboardToast } from '@/contexts/AppContext'

interface DashboardOverviewProps {
  products: any[]
  carts: any[]
  payments: any[]
  orders: any[]
  business: any
}

export function DashboardOverview({ products, carts, payments, orders, business }: DashboardOverviewProps) {
  const { toast } = useDashboardToast()
  
  
  const testAnimatedToasts = () => {
    // Test different types with staggered timing
    toast.success("Success Toast!", "This is a success message with smooth animations!")
    
    setTimeout(() => {
      toast.info("Info Toast!", "This shows helpful information with cool slide effects!")
    }, 500)
    
    setTimeout(() => {
      toast.warning("Warning Toast!", "This is a warning message with progress bar!")
    }, 1000)
    
    setTimeout(() => {
      toast.error("Error Toast!", "This shows error with bounce animation!")
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Toast Test Section */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">🎉 Animated Toast System</h3>
            <p className="text-amber-200 text-sm">Test the new animated toasts with progress bars, smooth transitions, and bounce effects!</p>
          </div>
          <button
            onClick={testAnimatedToasts}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-500/25"
          >
            Test Animations ✨
          </button>
        </div>
      </div>
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Card */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-200 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-white">{products.length}</p>
              <p className="text-xs text-blue-400 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                {products.length > 0 ? "+12% from last month" : "Start adding products"}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Active Carts Card */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-200 mb-1">Active Carts</p>
              <p className="text-3xl font-bold text-white">{carts.length}</p>
              <p className="text-xs text-purple-400 mt-1 flex items-center">
                <ShoppingCart size={12} className="mr-1" />
                {carts.length > 0 ? "Customers shopping" : "No active carts"}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-200 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-white">
                ₦{payments.length > 0 ? 
                  (payments.reduce((sum: number, payment: any) => sum + payment.amount, 0) / 100).toFixed(2) : 
                  "0.00"
                }
              </p>
              <p className="text-xs text-emerald-400 mt-1 flex items-center">
                <DollarSign size={12} className="mr-1" />
                {payments.length} successful payments
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-200 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-white">{orders.length}</p>
              <p className="text-xs text-amber-400 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                {orders.filter((order: any) => order.status === 'pending').length} pending approval
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-[#1a1b1b] p-8 rounded-2xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/dashboard/products"
            className="group p-6 border-2 border-dashed border-blue-600/30 rounded-2xl hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-200 text-center block"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <p className="font-semibold text-white mb-2">Manage Products</p>
            <p className="text-sm text-gray-400">Add or edit inventory</p>
          </Link>

          <Link
            to="/dashboard/orders"
            className="group p-6 border-2 border-dashed border-amber-600/30 rounded-2xl hover:border-amber-500 hover:bg-amber-500/5 transition-all duration-200 text-center block"
          >
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
              <Star className="w-8 h-8 text-amber-400" />
            </div>
            <p className="font-semibold text-white mb-2">Process Orders</p>
            <p className="text-sm text-gray-400">
              {orders.filter((order: any) => order.status === 'pending').length} pending
            </p>
          </Link>

          <Link
            to="/dashboard/payments"
            className="group p-6 border-2 border-dashed border-emerald-600/30 rounded-2xl hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-200 text-center block"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <DollarSign className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="font-semibold text-white mb-2">View Payments</p>
            <p className="text-sm text-gray-400">Track revenue</p>
          </Link>

          <Link
            to="/dashboard/business"
            className="group p-6 border-2 border-dashed border-purple-600/30 rounded-2xl hover:border-purple-500 hover:bg-purple-500/5 transition-all duration-200 text-center block"
          >
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Building2 className="w-8 h-8 text-purple-400" />
            </div>
            <p className="font-semibold text-white mb-2">
              {business?.name ? "Edit Business" : "Setup Business"}
            </p>
            <p className="text-sm text-gray-400">Configure settings</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      {(orders.length > 0 || payments.length > 0) && (
        <div className="bg-[#2a2b2b] border border-gray-700 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#2a2b2b] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#2a2b2b] to-transparent z-10 pointer-events-none"></div>
            
            <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide py-2">
              {[...orders.slice(0, 3), ...payments.slice(0, 2)]
                .sort((a: any, b: any) => new Date(b.paid_at || b.created_at).getTime() - new Date(a.paid_at || a.created_at).getTime())
                .slice(0, 5)
                .map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#1a1b1b] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.reference ? 'bg-emerald-500' : 
                        item.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {item.reference ? `Payment ${item.reference}` : `Order #${item.id.slice(-6)}`}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {item.email || `${item.first_name} ${item.last_name}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-medium">
                        ₦{item.amount ? (item.amount / 100).toFixed(2) : item.total_price?.toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(item.paid_at || item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
