import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaSpinner, FaRobot, FaCheckCircle } from "react-icons/fa"
import { resumeAPI, jdAPI } from "../utils/api"

export default function ResumeScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resume, setResume] = useState(null)
  const [jds, setJds] = useState([])
  const [selectedJd, setSelectedJd] = useState("")
  const [loading, setLoading] = useState(true)
  const [screening, setScreening] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [resumeRes, jdRes] = await Promise.all([
        resumeAPI.getById(id),
        jdAPI.getAll()
      ])
      setResume(resumeRes.data.data)
      setJds(jdRes.data.data.jobDescriptions)
    } catch (err) {
      setError("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleScreen = async () => {
    setScreening(true)
    setError("")
    setResult(null)

    try {
      const response = await resumeAPI.screen(id, selectedJd || null)
      setResult(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || "Screening failed")
    } finally {
      setScreening(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="text-4xl text-blue-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Resume Screening</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{resume.fileName}</h2>
            <p className="text-sm text-gray-600">
              Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Job Description (Optional)
            </label>
            <select
              value={selectedJd}
              onChange={(e) => setSelectedJd(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">General Analysis (No JD)</option>
              {jds.map((jd) => (
                <option key={jd._id} value={jd._id}>
                  {jd.title} - {jd.company}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleScreen}
            disabled={screening}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {screening && <FaSpinner className="animate-spin" />}
            <FaRobot />
            <span>{screening ? "Analyzing..." : "Start AI Analysis"}</span>
          </button>

          {result && (
            <div className="mt-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaCheckCircle className="text-green-600 text-2xl" />
                  <h3 className="text-xl font-semibold text-gray-800">Analysis Complete</h3>
                </div>
                {result.matchScore > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium text-gray-700">Match Score</span>
                      <span className="text-2xl font-bold text-blue-600">{result.matchScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${result.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Detailed Analysis</h4>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {result.analysis}
                  </pre>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => navigate("/resumes")}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Back to Resumes
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Analyze Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
