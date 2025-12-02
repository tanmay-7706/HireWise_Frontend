import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSpinner, FaCheckCircle, FaUpload, FaBriefcase, FaRobot, FaFileAlt } from "react-icons/fa"
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
      console.error("Dashboard fetch error:", err)
      
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
        return
      }
      
      setError(err.response?.data?.message || "Failed to fetch user data")
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
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FaCheckCircle className="text-green-600 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
            <div className="grid md:grid-cols-3 gap-4">
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

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => navigate("/resume/upload")}
              className="bg-white border-2 border-blue-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition text-center"
            >
              <FaUpload className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Resume</h3>
              <p className="text-sm text-gray-600">Upload and parse your resume</p>
            </button>

            <button
              onClick={() => navigate("/resumes")}
              className="bg-white border-2 border-green-200 rounded-lg p-6 hover:border-green-500 hover:shadow-lg transition text-center"
            >
              <FaFileAlt className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">My Resumes</h3>
              <p className="text-sm text-gray-600">View and manage resumes</p>
            </button>

            <button
              onClick={() => navigate("/job-descriptions")}
              className="bg-white border-2 border-purple-200 rounded-lg p-6 hover:border-purple-500 hover:shadow-lg transition text-center"
            >
              <FaBriefcase className="text-4xl text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Descriptions</h3>
              <p className="text-sm text-gray-600">Manage job postings</p>
            </button>

            <button
              onClick={() => navigate("/interview/start")}
              className="bg-white border-2 border-orange-200 rounded-lg p-6 hover:border-orange-500 hover:shadow-lg transition text-center"
            >
              <FaRobot className="text-4xl text-orange-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mock Interview</h3>
              <p className="text-sm text-gray-600">Practice with AI coach</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
