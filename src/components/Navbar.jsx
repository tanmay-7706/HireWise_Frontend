import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaFileAlt, FaBriefcase, FaRobot, FaSun, FaMoon } from "react-icons/fa"
import { isAuthenticated, removeToken, getUser } from "../utils/auth"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
  const navigate = useNavigate()
  const authenticated = isAuthenticated()
  const user = getUser()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    removeToken()
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/hirewise_favicon.svg" 
              alt="HireWise Logo" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 hidden sm:inline">
              HireWise
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition font-medium">
              <FaHome size={18} />
              <span>Home</span>
            </Link>
            {authenticated && (
              <>
                <Link to="/resumes" className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition font-medium">
                  <FaFileAlt size={18} />
                  <span>Resumes</span>
                </Link>
                <Link to="/job-descriptions" className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition font-medium">
                  <FaBriefcase size={18} />
                  <span>Jobs</span>
                </Link>
                <Link to="/interview/start" className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition font-medium">
                  <FaRobot size={18} />
                  <span>Interview</span>
                </Link>
                <Link to="/career-roadmap" className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition font-medium">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  <span>Career</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-slate-600" />}
            </button>

            {authenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-700 dark:text-slate-300 hidden sm:inline">
                  Welcome, <strong className="text-emerald-600 dark:text-emerald-400">{user?.name || "User"}</strong>
                </span>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition font-medium shadow-md hover:shadow-emerald-500/30"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition font-medium"
                >
                  <FaSignOutAlt size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition"
                >
                  <FaSignInAlt size={16} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition font-medium shadow-md hover:shadow-emerald-500/30"
                >
                  <FaUserPlus size={16} />
                  <span className="hidden sm:inline">Signup</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
