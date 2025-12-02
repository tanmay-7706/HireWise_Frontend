import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSpinner, FaRobot } from "react-icons/fa"
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
      setError(err.response?.data?.message || "Failed to start interview")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <FaRobot className="text-6xl text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Mock Interview</h1>
            <p className="text-gray-600">Practice your interview skills with AI-powered coaching</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What position are you interviewing for?
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Full Stack Developer, Data Scientist"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <FaSpinner className="animate-spin" />}
              <span>{loading ? "Starting Interview..." : "Start Mock Interview"}</span>
            </button>
          </form>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">What to expect:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>AI will ask you relevant interview questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>You'll receive instant feedback on your answers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Get scored on each response</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Receive an overall performance report</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/interviews")}
              className="text-blue-600 hover:underline"
            >
              View past interviews
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
