import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaMapMarkedAlt, FaRocket, FaSpinner, FaArrowLeft, FaCheckCircle, FaBook, FaClock, FaTrash } from "react-icons/fa"
import { careerAPI } from "../utils/api"

export default function CareerRoadmap() {
  const [targetRole, setTargetRole] = useState("")
  const [roadmaps, setRoadmaps] = useState([])
  const [selectedRoadmap, setSelectedRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoadmaps()
  }, [])

  const fetchRoadmaps = async () => {
    try {
      const response = await careerAPI.getAll()
      setRoadmaps(response.data.data)
      if (response.data.data.length > 0) {
        setSelectedRoadmap(response.data.data[0])
      }
    } catch (err) {
      console.error("Fetch roadmaps error:", err)
      setError("Failed to load career roadmaps.")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!targetRole.trim()) return

    setGenerating(true)
    setError("")

    try {
      const response = await careerAPI.generate({ targetRole })
      const newRoadmap = response.data.data
      setRoadmaps([newRoadmap, ...roadmaps])
      setSelectedRoadmap(newRoadmap)
      setTargetRole("")
    } catch (err) {
      console.error("Generate roadmap error:", err)
      setError("Failed to generate roadmap. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm("Delete this roadmap?")) return

    try {
      await careerAPI.delete(id)
      const updatedRoadmaps = roadmaps.filter(r => r._id !== id)
      setRoadmaps(updatedRoadmaps)
      if (selectedRoadmap?._id === id) {
        setSelectedRoadmap(updatedRoadmaps[0] || null)
      }
    } catch (err) {
      console.error("Delete roadmap error:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <FaSpinner className="animate-spin text-4xl text-emerald-600 dark:text-emerald-400" />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar / Input Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <FaRocket className="mr-2 text-emerald-600 dark:text-emerald-400" />
                New Career Path
              </h2>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Full Stack Engineer"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 flex items-center justify-center"
                >
                  {generating ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Generating...
                    </>
                  ) : (
                    "Generate Roadmap"
                  )}
                </button>
              </form>
            </div>

            {/* History List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Your Roadmaps</h3>
              {roadmaps.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm">No roadmaps generated yet.</p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {roadmaps.map((roadmap) => (
                    <div
                      key={roadmap._id}
                      onClick={() => setSelectedRoadmap(roadmap)}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex justify-between items-center group ${
                        selectedRoadmap?._id === roadmap._id
                          ? "bg-emerald-50 dark:bg-emerald-900/30 border-indigo-200 dark:border-emerald-800"
                          : "hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent"
                      } border`}
                    >
                      <div>
                        <p className={`font-medium ${
                          selectedRoadmap?._id === roadmap._id
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-slate-700 dark:text-slate-300"
                        }`}>
                          {roadmap.targetRole}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(roadmap.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDelete(roadmap._id, e)}
                        className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Visualization Section */}
          <div className="lg:col-span-8">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            {selectedRoadmap ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-900 dark:to-teal-900 px-8 py-8 text-white">
                  <h1 className="text-3xl font-bold mb-2">{selectedRoadmap.targetRole}</h1>
                  <p className="text-emerald-100 opacity-90">{selectedRoadmap.overview}</p>
                </div>

                <div className="p-8">
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                    <div className="space-y-12">
                      {selectedRoadmap.roadmap.map((step, index) => (
                        <div key={index} className="relative flex items-start group">
                          {/* Step Number Bubble */}
                          <div className="absolute left-0 w-16 h-16 flex items-center justify-center bg-white dark:bg-slate-800 border-4 border-emerald-50 dark:border-slate-700 rounded-full z-10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                              {step.step}
                            </div>
                          </div>

                          {/* Content Card */}
                          <div className="ml-24 w-full bg-slate-50 dark:bg-slate-700/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {step.title}
                              </h3>
                              <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2 md:mt-0 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                                <FaClock className="mr-2" />
                                {step.estimatedTime}
                              </div>
                            </div>
                            
                            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                              {step.description}
                            </p>

                            {step.resources && step.resources.length > 0 && (
                              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-600">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                                  <FaBook className="mr-2 text-slate-400" /> Recommended Resources
                                </h4>
                                <ul className="space-y-2">
                                  {step.resources.map((resource, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                                      <span className="mr-2 text-emerald-500">•</span>
                                      {resource}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                  <FaMapMarkedAlt className="text-5xl text-emerald-300 dark:text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Design Your Future
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                  Enter your dream job title on the left to generate a personalized AI-powered learning roadmap tailored to your current skills.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
