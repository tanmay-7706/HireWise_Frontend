import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaLightbulb, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa"
import { isAuthenticated, removeToken, getUser } from "../utils/auth"

export default function Navbar() {
  const navigate = useNavigate()
  const authenticated = isAuthenticated()
  const user = getUser()

  const handleLogout = () => {
    removeToken()
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-linear-to-r from-blue-600 to-blue-400 text-white px-3 py-1 rounded-lg font-bold text-xl">
              HW
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">HireWise</span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
              <FaHome size={18} />
              <span>Home</span>
            </Link>
            <a href="#features" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
              <FaLightbulb size={18} />
              <span>Features</span>
            </a>
            <a href="#about" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
              <FaInfoCircle size={18} />
              <span>About</span>
            </a>
            <a href="#contact" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
              <FaEnvelope size={18} />
              <span>Contact</span>
            </a>
          </div>

          {/* Right: Auth Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 hidden sm:inline">
                  Welcome, <strong>{user?.name || "User"}</strong>
                </span>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <FaSignOutAlt size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <FaSignInAlt size={16} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
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
