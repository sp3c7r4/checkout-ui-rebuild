import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Search, 
  Plus, 
  MoreHorizontal,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  Calendar,
  MessageCircle,
  Bot,
  Activity,
  Eye,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "./contexts/AppContext";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Full Statistics");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth()

  // Real chart data for chatbot analytics
  const chartData = {
    conversations: [45, 52, 48, 61, 55, 67, 59, 72, 69, 78, 75, 82],
    users: [120, 145, 180, 165, 210, 245, 280, 320, 350, 385, 420, 465],
    satisfaction: [4.2, 4.3, 4.1, 4.4, 4.5, 4.3, 4.6, 4.7, 4.5, 4.8, 4.6, 4.9]
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="h-screen bg-[#1b2534] flex flex-col lg:flex-row">
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden bg-[#1b2534] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f1d316] rounded-lg flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">ChatBot Analytics</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-[#1b2534] border-r border-gray-700 flex flex-col transform transition-transform duration-300">
            {/* Mobile Menu Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f1d316] rounded-lg flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">ChatBot</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-4 flex-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                MAIN MENU
              </div>
              <nav className="space-y-2">
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-white bg-gray-700 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </a>
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <MessageCircle className="w-5 h-5" />
                  <span>Conversations</span>
                </a>
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <Users className="w-5 h-5" />
                  <span>Users</span>
                </a>
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <Activity className="w-5 h-5" />
                  <span>Analytics</span>
                </a>
              </nav>

              <div className="mt-8">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  TEAMS
                </div>
                <div className="space-y-2">
                  <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span>Support</span>
                  </a>
                  <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Development</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Menu Bottom */}
            <div className="p-4 border-t border-gray-700 space-y-2">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
              <a href="#" onClick={() => alert()} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                <LogOut className="w-5 h-5"/>
                <span>Log Out</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#1b2534] border-r border-gray-700 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 transform hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 bg-[#f1d316] rounded-lg flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ChatBot Analytics</span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="p-6 flex-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            MAIN MENU
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-white bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
              <MessageCircle className="w-5 h-5" />
              <span>Conversations</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
              <Users className="w-5 h-5" />
              <span>Users</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
              <Activity className="w-5 h-5" />
              <span>Analytics</span>
            </a>
          </nav>

          {/* Teams */}
          <div className="mt-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              TEAMS
            </div>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span>Support</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Development</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="p-6 border-t border-gray-700 space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
          <a href="#" onClick={() => alert()} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-800 flex flex-col h-full">
        {/* Header */}
        <div className="bg-[#1b2534] border-b border-gray-700 px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-white">ChatBot Analytics</h1>
              <div className="flex items-center gap-4 lg:gap-6 mt-2">
                <button 
                  onClick={() => setActiveTab("Full Statistics")}
                  className={`text-sm font-medium ${activeTab === "Full Statistics" ? "text-white border-b-2 border-[#f1d316]" : "text-gray-400"} pb-1 transition-all duration-200 hover:text-white`}
                >
                  Full Statistics
                </button>
                <button 
                  onClick={() => setActiveTab("Results Summary")}
                  className={`text-sm font-medium ${activeTab === "Results Summary" ? "text-white border-b-2 border-[#f1d316]" : "text-gray-400"} pb-1 transition-all duration-200 hover:text-white`}
                >
                  Results Summary
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-[#f1d316] hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                <Plus className="w-5 h-5 text-gray-300 hover:text-white" />
              </button>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-200 cursor-pointer">
                <span className="text-white font-medium text-xs lg:text-sm">JD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-800">
          {/* Top Cards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            {/* Total Conversations */}
            <div className="bg-[#1b2534] rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div>
                  <h3 className="text-sm lg:text-lg font-semibold text-white">Total</h3>
                  <p className="text-sm lg:text-lg font-semibold text-white">Conversations</p>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#f1d316] rounded-lg flex items-center justify-center animate-pulse">
                  <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                </div>
              </div>
              <div className="text-xl lg:text-2xl font-bold text-white mb-2">12,847</div>
              <div className="flex items-center gap-1 text-xs lg:text-sm">
                <span className="text-green-400">+15%</span>
                <span className="text-gray-400">this month</span>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-[#1b2534] rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-3 h-3 lg:w-4 lg:h-4 text-blue-400" />
                  </div>
                  <span className="text-sm lg:text-lg font-semibold text-white">Users</span>
                </div>
              </div>
              
              {/* Mini Chart */}
              <div className="h-12 lg:h-16 mb-3 lg:mb-4">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    points={chartData.users.map((value, index) => 
                      `${(index * 200) / (chartData.users.length - 1)},${60 - (value / Math.max(...chartData.users)) * 50}`
                    ).join(' ')}
                    className="animate-pulse"
                  />
                  <circle cx="190" cy="10" r="3" fill="#3B82F6" className="animate-bounce" />
                </svg>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl lg:text-2xl font-bold text-white">3,254</div>
                  <div className="flex items-center gap-1 text-xs lg:text-sm">
                    <span className="text-green-400">+8%</span>
                    <span className="text-gray-400">active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Satisfaction Score */}
            <div className="bg-[#1b2534] rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="text-sm lg:text-lg font-semibold text-white">Satisfaction</h3>
              </div>
              
              <div className="text-xs lg:text-sm text-green-400 font-medium mb-3 lg:mb-4">4.8/5.0</div>
              
              {/* Star Rating Chart */}
              <div className="flex items-end justify-between h-16 lg:h-20 mb-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 lg:w-4 h-6 lg:h-8 bg-purple-500/30 rounded-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                  <span className="text-xs text-gray-400">1★</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 lg:w-4 h-8 lg:h-12 bg-purple-500/30 rounded-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                  <span className="text-xs text-gray-400">2★</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 lg:w-4 h-10 lg:h-16 bg-purple-500/30 rounded-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                  <span className="text-xs text-gray-400">3★</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 lg:w-4 h-12 lg:h-18 bg-[#f1d316] rounded-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                  <span className="text-xs text-gray-400">4★</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 lg:w-4 h-14 lg:h-20 bg-[#f1d316] rounded-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                  <span className="text-xs text-gray-400">5★</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>2%</span>
                <span>5%</span>
                <span>12%</span>
                <span>28%</span>
                <span>53%</span>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white transform hover:scale-105 hover:shadow-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="text-xl lg:text-3xl font-bold">1.2s</div>
                <button className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200">
                  <Activity className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>
              <div className="text-xs lg:text-sm opacity-90 mb-3 lg:mb-4">Avg Response</div>
              <div className="mb-4 lg:mb-6">
                <h4 className="text-sm lg:text-lg font-semibold mb-1">Lightning Fast</h4>
                <p className="text-xs lg:text-sm opacity-90">Bot Performance!</p>
              </div>
              <div className="flex items-center justify-between">
                <button className="text-xs lg:text-sm font-medium opacity-90 hover:opacity-100 transition-opacity duration-200">Details</button>
                <button className="bg-black text-white px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-800 transform hover:scale-105 transition-all duration-200">
                  Optimize
                </button>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Conversations Over Time */}
            <div className="bg-[#1b2534] rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-700 transform hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-4 lg:mb-6">Conversations Over Time</h3>
              <div className="h-48 lg:h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#374151" strokeWidth="1"/>
                  ))}
                  {/* Data line */}
                  <polyline
                    fill="none"
                    stroke="#f1d316"
                    strokeWidth="3"
                    points={chartData.conversations.map((value, index) => 
                      `${(index * 400) / (chartData.conversations.length - 1)},${200 - (value / Math.max(...chartData.conversations)) * 160}`
                    ).join(' ')}
                  />
                  {/* Data points */}
                  {chartData.conversations.map((value, index) => (
                    <circle 
                      key={index}
                      cx={(index * 400) / (chartData.conversations.length - 1)} 
                      cy={200 - (value / Math.max(...chartData.conversations)) * 160} 
                      r="4" 
                      fill="#f1d316"
                      className="hover:r-6 transition-all duration-200"
                    />
                  ))}
                </svg>
              </div>
              <div className="flex justify-between text-xs lg:text-sm text-gray-400 mt-2">
                {months.slice(0, 6).map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>

            {/* User Growth */}
            <div className="bg-[#1b2534] rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-700 transform hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-4 lg:mb-6">User Growth</h3>
              <div className="h-48 lg:h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#374151" strokeWidth="1"/>
                  ))}
                  {/* Bars */}
                  {chartData.users.slice(0, 12).map((value, index) => (
                    <rect
                      key={index}
                      x={index * 30 + 10}
                      y={200 - (value / Math.max(...chartData.users)) * 160}
                      width="20"
                      height={(value / Math.max(...chartData.users)) * 160}
                      fill={index % 2 === 0 ? "#3B82F6" : "#f1d316"}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </svg>
              </div>
              <div className="flex justify-between text-xs lg:text-sm text-gray-400 mt-2">
                {months.slice(0, 6).map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="bg-[#1b2534] rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-700 mb-6 lg:mb-8 transform hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-base lg:text-lg font-semibold text-white mb-4 lg:mb-6">Recent Conversations</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* User 1 */}
              <div className="flex items-center justify-between hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-medium text-sm lg:text-base">U1</span>
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm lg:text-base">John Doe</div>
                    <div className="text-xs lg:text-sm text-gray-400">5 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="text-right">
                    <div className="font-semibold text-white text-sm lg:text-base">15 msgs</div>
                    <div className="text-xs lg:text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Resolved</div>
                  </div>
                  <button className="hover:bg-gray-600 p-1 rounded transition-colors duration-200">
                    <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* User 2 */}
              <div className="flex items-center justify-between hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-medium text-sm lg:text-base">S</span>
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm lg:text-base">Sarah Wilson</div>
                    <div className="text-xs lg:text-sm text-gray-400">12 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="text-right">
                    <div className="font-semibold text-white text-sm lg:text-base">8 msgs</div>
                    <div className="text-xs lg:text-sm text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">Active</div>
                  </div>
                  <button className="hover:bg-gray-600 p-1 rounded transition-colors duration-200">
                    <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 transform hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 lg:p-6 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">User Activity</h3>
                <div className="relative">
                  <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-8 lg:pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f1d316] focus:border-transparent transition-all duration-200 w-full lg:w-auto"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-600">User</th>
                    <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-600">Messages</th>
                    <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-600">Last Active</th>
                    <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-600">Satisfaction</th>
                    <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-[#f1d316] focus:ring-[#f1d316]" />
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-xs lg:text-sm">JD</span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm lg:text-base">John Doe</span>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-gray-600 text-sm lg:text-base">23</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-green-600 bg-green-50 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">Active</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-gray-600 text-sm lg:text-base">2 min ago</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="font-semibold text-gray-900 text-sm lg:text-base">⭐ 4.8</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <button className="text-gray-400 hover:text-[#f1d316] transition-colors duration-200 text-sm lg:text-base">View</button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-[#f1d316] focus:ring-[#f1d316]" />
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-xs lg:text-sm">SW</span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm lg:text-base">Sarah Wilson</span>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-gray-600 text-sm lg:text-base">15</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-orange-600 bg-orange-50 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">Away</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-gray-600 text-sm lg:text-base">1 hour ago</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="font-semibold text-gray-900 text-sm lg:text-base">⭐ 4.5</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <button className="text-gray-400 hover:text-[#f1d316] transition-colors duration-200 text-sm lg:text-base">View</button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-[#f1d316] focus:ring-[#f1d316]" />
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium text-xs lg:text-sm">MJ</span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm lg:text-base">Mike Johnson</span>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-gray-600 text-sm lg:text-base">31</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-green-600 bg-green-50 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">Active</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="text-gray-600 text-sm lg:text-base">30 min ago</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <span className="font-semibold text-gray-900 text-sm lg:text-base">⭐ 5.0</span>
                    </td>
                    <td className="py-3 lg:py-4 px-4 lg:px-6">
                      <button className="text-gray-400 hover:text-[#f1d316] transition-colors duration-200 text-sm lg:text-base">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}