import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaFileUpload, FaList, FaBriefcase, FaRobot, FaUserCircle, FaSpinner, FaRocket, FaStar, FaFileAlt } from "react-icons/fa"
import { userAPI } from "../utils/api"

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
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

    fetchUserData()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl max-w-md text-center shadow-lg">
          <p className="font-semibold mb-2">Error Loading Dashboard</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700 animate-fade-in-up">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50 transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="h-24 w-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white text-4xl font-bold">
              {userData?.name?.charAt(0) || "U"}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{userData?.name}</span>!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                Your career command center is ready. Track your progress, analyze resumes, and practice for your next big interview.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview (Mock Data for Visuals) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-100">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <FaFileAlt className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Resumes Analyzed</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <FaRobot className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Interviews Practiced</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
              <FaStar className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Avg. Match Score</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">78%</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 px-2 flex items-center">
            <FaRocket className="mr-3 text-emerald-600" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Upload Resume Card */}
            <div 
              onClick={() => navigate("/resume/upload")}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="h-14 w-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FaFileUpload className="text-2xl text-emerald-600 dark:text-emerald-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Upload Resume</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
                Get instant AI feedback and ATS scoring.
              </p>
            </div>

            {/* My Resumes Card */}
            <div 
              onClick={() => navigate("/resumes")}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 dark:bg-teal-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="h-14 w-14 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FaList className="text-2xl text-teal-600 dark:text-teal-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">My Resumes</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
                Manage your portfolio and track improvements.
              </p>
            </div>

            {/* Job Descriptions Card */}
            <div 
              onClick={() => navigate("/job-descriptions")}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 dark:bg-amber-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FaBriefcase className="text-2xl text-amber-600 dark:text-amber-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Job Descriptions</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
                Save JDs to tailor your resume perfectly.
              </p>
            </div>

            {/* Mock Interview Card */}
            <div 
              onClick={() => navigate("/interview/start")}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 dark:bg-rose-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="h-14 w-14 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <FaRobot className="text-2xl text-rose-600 dark:text-rose-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Mock Interview</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
                Practice with our AI interviewer.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tip Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden animate-fade-in-up delay-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <FaStar className="text-yellow-400 mr-2" /> Pro Tip of the Day
              </h3>
              <p className="text-slate-300 text-lg max-w-2xl">
                Tailoring your resume keywords to the job description can increase your chances of passing ATS by up to 70%. Use our "Screen Resume" feature to check your match score!
              </p>
            </div>
            <button 
              onClick={() => navigate("/resumes")}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-1 whitespace-nowrap"
            >
              Try It Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
