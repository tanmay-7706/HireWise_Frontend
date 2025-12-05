import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"
import { useToast } from "../components/Toast"

export default function TokenDebug() {
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    
    console.log("=== TOKEN DEBUG ===")
    console.log("Token exists:", !!token)
    console.log("Token value:", token ? token.substring(0, 50) + "..." : "NONE")
    console.log("User exists:", !!user)
    console.log("User value:", user)
    console.log("==================")
  }, [])

  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")

  const handleClearStorage = () => {
    localStorage.clear()
    toast.success("LocalStorage cleared! Redirecting to login...")
    setTimeout(() => navigate("/login"), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Authentication Debug</h1>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                {token ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaExclamationTriangle className="text-red-600" />
                )}
                <h3 className="font-semibold">Token Status</h3>
              </div>
              <p className="text-sm text-gray-600">
                {token ? "✅ Token found in localStorage" : "❌ No token in localStorage"}
              </p>
              {token && (
                <p className="text-xs text-gray-500 mt-2 font-mono break-all">
                  {token.substring(0, 100)}...
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                {user ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaExclamationTriangle className="text-red-600" />
                )}
                <h3 className="font-semibold">User Data</h3>
              </div>
              <p className="text-sm text-gray-600">
                {user ? "✅ User data found" : "❌ No user data"}
              </p>
              {user && (
                <pre className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded overflow-auto">
                  {user}
                </pre>
              )}
            </div>

            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What to do:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• If no token: Click "Clear & Login" below</li>
                <li>• If token exists but getting 401: Token might be expired or invalid</li>
                <li>• Check browser console for detailed logs</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleClearStorage}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Clear Storage & Login
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
