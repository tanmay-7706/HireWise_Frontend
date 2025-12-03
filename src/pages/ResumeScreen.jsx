import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaBriefcase, FaChartPie } from "react-icons/fa"
import { resumeAPI, jdAPI } from "../utils/api"

export default function ResumeScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resume, setResume] = useState(null)
  const [jds, setJds] = useState([])
  const [selectedJd, setSelectedJd] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumeRes, jdsRes] = await Promise.all([
          resumeAPI.getById(id),
          jdAPI.getAll()
        ])
        setResume(resumeRes.data.data)
        setJds(jdsRes.data.data)
      } catch (err) {
        console.error("Fetch data error:", err)
        setError("Failed to load data.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleScreen = async () => {
    if (!selectedJd) {
      setError("Please select a job description.")
      return
    }

    setAnalyzing(true)
    setError("")
    setResult(null)

    try {
      const response = await resumeAPI.screen(id, selectedJd)
      setResult(response.data.data)
    } catch (err) {
      console.error("Screening error:", err)
      setError("Analysis failed. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading resume details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/resumes")}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Resumes
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-8">
          <div className="bg-emerald-600 dark:bg-emerald-900 px-8 py-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FaChartPie className="mr-3 text-3xl" />
              Resume Screening
            </h1>
            <p className="text-emerald-100 mt-2">
              Analyze your resume against a job description to see your match score.
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Selected Resume</h2>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                <p className="font-medium text-slate-800 dark:text-slate-200">{resume?.fileName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Uploaded on {new Date(resume?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Select Job Description</h2>
              <div className="relative">
                <select
                  value={selectedJd}
                  onChange={(e) => setSelectedJd(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white appearance-none"
                >
                  <option value="">-- Choose a Job Description --</option>
                  {jds.map((jd) => (
                    <option key={jd._id} value={jd._id}>
                      {jd.title} at {jd.company}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                  <FaBriefcase />
                </div>
              </div>
              {jds.length === 0 && (
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                  No job descriptions found. <span onClick={() => navigate("/job-descriptions")} className="underline cursor-pointer font-medium">Create one first</span>.
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button
              onClick={handleScreen}
              disabled={analyzing || !selectedJd}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {analyzing ? (
                <>
                  <FaSpinner className="animate-spin mr-3" /> Analyzing Resume...
                </>
              ) : (
                "Analyze Match"
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Analysis Results</h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <svg className="h-full w-full transform -rotate-90">
                    <circle
                      className="text-slate-200 dark:text-slate-700"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="80"
                      cy="80"
                    />
                    <circle
                      className={`${
                        result.matchScore >= 70 ? "text-green-500" : 
                        result.matchScore >= 40 ? "text-yellow-500" : "text-red-500"
                      } transition-all duration-1000 ease-out`}
                      strokeWidth="12"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * result.matchScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="80"
                      cy="80"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">{result.matchScore}%</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Match</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" /> Matching Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.matchingSkills && result.matchingSkills.length > 0 ? (
                        result.matchingSkills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md font-medium">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400 text-sm">No direct skill matches found.</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                      <FaTimesCircle className="text-red-500 mr-2" /> Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills && result.missingSkills.length > 0 ? (
                        result.missingSkills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-md font-medium">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400 text-sm">No missing skills identified!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">AI Feedback</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                  {result.analysis}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
