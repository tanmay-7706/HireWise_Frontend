import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaFileUpload, FaList, FaBriefcase, FaRobot, FaUserCircle, FaSpinner } from "react-icons/fa"
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
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-100 dark:border-slate-700 animate-fade-in-up">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shadow-inner">
              <FaUserCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{userData?.name}</span>!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                Ready to take the next step in your career?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 px-2">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Upload Resume Card */}
          <div 
            onClick={() => navigate("/resume/upload")}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaFileUpload className="text-2xl text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Resume</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Upload your resume for AI analysis and screening.
            </p>
          </div>

          {/* My Resumes Card */}
          <div 
            onClick={() => navigate("/resumes")}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaList className="text-2xl text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">My Resumes</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              View and manage your uploaded resumes and scores.
            </p>
          </div>

          {/* Job Descriptions Card */}
          <div 
            onClick={() => navigate("/job-descriptions")}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaBriefcase className="text-2xl text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Job Descriptions</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Manage job descriptions for resume matching.
            </p>
          </div>

          {/* Mock Interview Card */}
          <div 
            onClick={() => navigate("/interview/start")}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaRobot className="text-2xl text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Mock Interview</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Practice with AI-generated interview questions.
            </p>
          </div>

          {/* Career Roadmap Card */}
          <div 
            onClick={() => navigate("/career-roadmap")}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="text-2xl text-amber-600 dark:text-amber-400 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Career Roadmap</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Get AI-powered personalized learning paths.
            </p>
          </div>
        </div>

        {/* Recent Activity or Stats could go here */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-900 dark:to-teal-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Pro Tip</h3>
            <p className="text-emerald-100 text-lg max-w-2xl">
              Did you know? Tailoring your resume keywords to the job description can increase your chances of passing ATS by up to 70%. Use our "Screen Resume" feature to check your match score!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
