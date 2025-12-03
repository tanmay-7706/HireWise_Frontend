import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSpinner, FaRobot, FaArrowLeft, FaLightbulb, FaCheckCircle } from "react-icons/fa"
import { interviewAPI } from "../utils/api"

export default function InterviewStart() {
  const [jobTitle, setJobTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleStart = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await interviewAPI.start({ jobTitle })
      navigate(`/interview/${response.data.data._id}`)
    } catch (err) {
      console.error("Start interview error:", err)
      setError(err.response?.data?.message || "Failed to start interview")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-900 dark:to-teal-900 px-8 py-10 text-center">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <FaRobot className="text-4xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Mock Interview</h1>
            <p className="text-emerald-100 text-lg max-w-xl mx-auto">
              Practice your interview skills in a realistic environment with our AI coach.
            </p>
          </div>

          <div className="p-8 md:p-10">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-8 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleStart} className="space-y-8">
              <div>
                <label className="block text-lg font-medium text-slate-900 dark:text-white mb-3">
                  What position are you interviewing for?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior React Developer, Data Scientist, Product Manager"
                    required
                    className="w-full px-5 py-4 text-lg border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 transition-all shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-0.5 duration-200"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-3" /> Starting Session...
                  </>
                ) : (
                  "Start Mock Interview"
                )}
              </button>
            </form>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center">
                  <FaLightbulb className="mr-2 text-emerald-500" /> What to expect
                </h3>
                <ul className="space-y-3">
                  {[
                    "AI asks relevant technical & behavioral questions",
                    "Real-time conversation simulation",
                    "Instant feedback on your answers",
                    "Comprehensive performance report"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-emerald-800 dark:text-indigo-200 text-sm">
                      <FaCheckCircle className="mt-0.5 mr-2 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Tips for success</h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span> Be specific about your role to get tailored questions.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> Treat this like a real interview - take your time to answer.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> Use the STAR method (Situation, Task, Action, Result) for behavioral questions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
