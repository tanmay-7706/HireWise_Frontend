import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FaBars, FaTimes, FaMoon, FaSun, FaSignOutAlt, FaChartLine, FaFileAlt, FaBriefcase, FaRobot, FaRoad, FaHome, FaChevronRight } from "react-icons/fa"
import { useTheme } from "../context/ThemeContext"
import { isAuthenticated, getUser, removeToken } from "../utils/auth"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = isAuthenticated()

  useEffect(() => {
    setUser(getUser())
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLogout = () => {
    removeToken()
    localStorage.removeItem("user")
    navigate("/login")
    setIsOpen(false)
  }

  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    ...(isAuth ? [
      { name: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
      { name: "Resumes", path: "/resumes", icon: <FaFileAlt /> },
      { name: "Jobs", path: "/job-descriptions", icon: <FaBriefcase /> },
      { name: "Interview", path: "/interview/start", icon: <FaRobot /> },
      { name: "Career", path: "/career-roadmap", icon: <FaRoad /> },
    ] : [])
  ]

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-slate-900/5 dark:shadow-slate-900/20 py-2" 
            : "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group" onClick={closeMenu}>
              <div className="relative">
                <img 
                  src="/hirewise_favicon.svg" 
                  alt="HireWise" 
                  className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Hire<span className="text-emerald-600 dark:text-emerald-500">Wise</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 text-slate-600 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>

              {/* Auth Section */}
              {isAuth ? (
                <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    title="Logout"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`block h-0.5 w-5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                  <span className={`block h-0.5 w-5 bg-current transform transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block h-0.5 w-5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <img src="/hirewise_favicon.svg" alt="HireWise" className="w-8 h-8" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Hire<span className="text-emerald-600">Wise</span>
              </span>
            </Link>
            <button 
              onClick={closeMenu} 
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg ${location.pathname === link.path ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}`}>
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </div>
                  <FaChevronRight className={`w-3 h-3 ${location.pathname === link.path ? 'text-emerald-400' : 'text-slate-300 dark:text-slate-600'}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            {isAuth ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-100 dark:border-red-800/30"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block w-full py-3 text-center text-slate-700 dark:text-slate-300 font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="block w-full py-3 text-center bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]"></div>
    </>
  )
}
