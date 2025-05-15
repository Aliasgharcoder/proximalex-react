import { useState, useEffect,} from "react";
import { Link, useLocation, useNavigate,NavLink,} from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, } from "react-icons/fa";
import { Home, Info, Briefcase, Mail, Settings, LogOut, } from "react-feather";
import logo from "../../assets/images/MainLogo.png";

const role = localStorage.getItem("userRole");

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const googleUser = localStorage.getItem("googleUser");
    setIsLoggedIn(!!token || !!googleUser);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("googleUser");
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    navigate("/login");
  };

  const scrollToSection = (sectionId) => {
  if (location.pathname === "/") {
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate navbar height (adjust selector as needed)
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Get exact position accounting for any transforms
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.pageYOffset - navbarHeight;
      
      // Use window.scrollTo for precise control
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });
      
      setMenuOpen(false);
    }
  } else {
    navigate("/", { state: { scrollTo: sectionId } });
  }
};

  // Mobile menu items with icons
  const mobileMenuItems = [
    { 
      label: "Home", 
      icon: <Home size={20} className="flex-shrink-0" />,
      action: () => scrollToSection("hero-section")
    },
    { 
      label: "Services", 
      icon: <Briefcase size={20} className="flex-shrink-0" />,
      action: () => scrollToSection("services-section")
    },
    { 
      label: "About", 
      icon: <Info size={20} className="flex-shrink-0" />,
      action: () => {
      navigate("/about");
      window.scrollTo(0, 0); // Reset scroll to top
      }    
    },
    { 
      label: "Contact", 
      icon: <Mail size={20} className="flex-shrink-0" />,
      action: () => scrollToSection("contact-section")
    }
  ];

  const authMenuItems = isLoggedIn
    ? [
        {
          label: "Profile",
          icon: <Settings size={20} className="flex-shrink-0" />,
          to: role === "lawyer" ? "/lawyer/profile" : "/client/profile"
        },
        {
          label: "Logout",
          icon: <LogOut size={20} className="flex-shrink-0" />,
          action: handleLogout
        }
      ]
    : [
        {
          label: "Login",
          to: "/login",
          className: "text-blue-600 hover:bg-blue-50"
        },
        {
          label: "Sign Up",
          to: "/signup",
          className: "bg-blue-600 text-white hover:bg-blue-700 text-center"
        }
      ];

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-white/90">
      <div className="container px-6 mx-auto flex justify-between items-center text-sm">
        {/* Logo Section */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img className="h-10 w-auto mr-2" src={logo} alt="logo" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          {mobileMenuItems.map((item) => (
            <li key={item.label}>
              {item.to ? (
                <Link 
                  to={item.to} 
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.action}
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="hidden lg:block text-blue-600 font-medium hover:underline transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden lg:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="focus:outline-none"
              >
                <FaUserCircle className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to={role === "lawyer" ? "/lawyer/profile" : "/client/dashboard"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="lg:hidden p-2 ml-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

{/* Elegant Mobile Sidebar */}
<div className={`lg:hidden fixed inset-0 z-40 ${menuOpen ? "block" : "hidden"}`}>
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/30 transition-opacity duration-200"
    onClick={() => setMenuOpen(false)}
  ></div>
  
  {/* Sidebar Container */}
  <div
    className={`fixed top-0 right-0 h-screen w-70 bg-white shadow-xl transform ${
      menuOpen ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-200 ease-in-out flex flex-col`}
  >
    {/* Header */}
    <div className="h-16 px-4 border-b border-gray-100 flex justify-between items-center">
      <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
        <img className="h-8 w-auto" src={logo} alt="logo" />
      </Link>
      <button
        className="p-2 text-gray-500 hover:text-gray-700"
        onClick={() => setMenuOpen(false)}
      >
        <FaTimes className="text-lg" />
      </button>
    </div>
    
    {/* Content Area */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Main Links */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {mobileMenuItems.map((item) => {
          // Determine if current route matches or is a sub-route
          const isActive = item.to 
            ? location.pathname === item.to || 
              location.pathname.startsWith(`${item.to}/`) ||
              (item.to === '/' && location.pathname === '/') ||
              (item.to === '/about' && location.pathname.startsWith('/about')) ||
              (item.to === '/services' && location.pathname.startsWith('/services'))
            : false;
            
          return (
            <div key={item.label} className="px-2">
              {item.to ? (
                <NavLink
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={`p-1.5 rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    item.action();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <span className="p-1.5 rounded-md bg-gray-100 text-gray-500">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          );
        })}
      </nav>

      {/* Auth Links */}
      <div className="border-t border-gray-100 pt-2 pb-4 px-2">
        {authMenuItems.map((item) => {
          const isActive = item.to 
            ? location.pathname === item.to || 
              location.pathname.startsWith(`${item.to}/`)
            : false;
            
          return (
            <div key={item.label} className="px-2">
              {item.to ? (
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600' 
                      : item.className || 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon && (
                    <span className={`p-1.5 rounded-md ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.action();
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                    item.className || 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && (
                    <span className="p-1.5 rounded-md bg-gray-100 text-gray-500">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          );
        })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;