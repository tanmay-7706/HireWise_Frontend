import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSpinner, FaCheckCircle } from "react-icons/fa"
import { userAPI } from "../utils/api"
import { getUser, isAuthenticated } from "../utils/auth"

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login")
      return
    }

    fetchUserData()
  }, [navigate])

  const fetchUserData = async () => {
    try {
      const response = await userAPI.getProfile()
      setUserData(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user data")
      console.log("[v0] Dashboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <FaCheckCircle className="text-green-600 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* User Profile Card */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-lg font-medium text-gray-800">{user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-medium text-gray-800">{user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <p className="text-lg font-medium text-green-600">Active</p>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">HireWise Features</h2>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>AI Resume Screening</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>Interview Coach</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>Career Insights</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>Job Matching</span>
                </li>
              </ul>
            </div>
          </div>

          {userData && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>API Response:</strong> {JSON.stringify(userData, null, 2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
