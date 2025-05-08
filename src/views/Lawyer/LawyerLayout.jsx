import {
  LogOut,
  CalendarDays,
  Bell,
  LayoutDashboard,
  Briefcase,
  Settings,
  Menu,
  X,
  Search,
  ChevronLeft,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/MainLogo.png";

const LawyerLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Example dynamic user data
  const userData = {
    name: "John Doe",
    title: "Senior Attorney",
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/lawyer/dashboard" },
    { label: "My Cases", icon: <Briefcase size={20} />, to: "/lawyer/cases" },
    { label: "Calendar", icon: <CalendarDays size={20} />, to: "/lawyer/calendar" },
    { label: "Notifications", icon: <Bell size={20} />, to: "/lawyer/notifications" },
    { label: "Profile Settings", icon: <Settings size={20} />, to: "/lawyer/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 w-full bg-white shadow-md z-20 flex justify-between items-center px-4 py-3">
        <div className="flex items-center flex-shrink-0">
          <img className="h-10 w-auto" src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleMobileSearch} className="text-indigo-600">
            <Search size={20} />
          </button>
          <button onClick={toggleSidebar} className="text-indigo-600">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - appears when search icon is clicked */}
      {showMobileSearch && (
        <div className="lg:hidden fixed top-16 w-full bg-white px-4 py-3 z-10 shadow-md">
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:shadow-none ${
          isCollapsed ? "lg:w-16" : "lg:w-64"
        }`}
      >
        <div className="flex flex-col justify-between h-full p-4 pt-16 lg:pt-4">
          <div>
            {/* Logo and Collapse Button */}
            <div className={`flex items-center ${isCollapsed ? "justify-center pb-4" : "justify-between mb-8"}`}>
              <img 
                className={`transition-all duration-300 ${isCollapsed ? "h-6 w-auto" : "h-12 w-auto"}`} 
                src={logo} 
                alt="logo" 
              />
              {!isCollapsed && (
                <button
                  onClick={toggleCollapse}
                  className="hidden lg:flex items-center justify-center w-6 h-6 text-indigo-600 hover:bg-indigo-50 rounded-full ml-2"
                  title="Collapse sidebar"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
            </div>
            
            {isCollapsed && (
              <div className="absolute left-14 top-4">
                <button
                  onClick={toggleCollapse}
                  className="hidden lg:flex items-center justify-center w-6 h-6 text-indigo-600 hover:bg-indigo-50 rounded-full"
                  title="Expand sidebar"
                >
                  <ChevronLeft size={16} className="transform rotate-180" />
                </button>
              </div>
            )}

            <nav className="space-y-1">
              {navItems.map(({ label, icon, to }) => (
                <div key={label} className="group relative">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-indigo-100 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-100"
                      } ${isCollapsed ? "justify-center" : ""}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="flex-shrink-0">{icon}</span>
                    {!isCollapsed && <span>{label}</span>}
                  </NavLink>
                  {(isCollapsed || isSidebarOpen) && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {label}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="group relative">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-3 py-2 mt-4 text-sm font-medium text-red-500 hover:text-red-600 rounded-lg w-full ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut size={20} className="flex-shrink-0" />
              {!isCollapsed && "Logout"}
            </button>
            {(isCollapsed || isSidebarOpen) && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Logout
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 mt-16 lg:mt-0 p-4 lg:p-6 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          {/* Welcome Message */}
          <div className="order-1 lg:order-1">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
              Good {getTimeOfDay()}, {userData.name}
            </h1>
            <p className="text-sm text-gray-600">{userData.title}</p>
          </div>
          
          {/* Search Bar - desktop only */}
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex order-2 lg:order-2 w-full lg:w-auto"
          >
            <div className="relative w-full lg:w-64">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </form>
        </div>
        
        <Outlet />
      </main>
    </div>
  );
};

// Helper function for dynamic greeting
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

export default LawyerLayout;