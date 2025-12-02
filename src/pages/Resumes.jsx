import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSpinner, FaTrash, FaEye, FaPlus, FaRobot } from "react-icons/fa"
import { resumeAPI } from "../utils/api"

export default function Resumes() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAll()
      setResumes(response.data.data || [])
    } catch (err) {
      console.error('Fetch resumes error:', err)
      setError(err.response?.data?.message || "Failed to fetch resumes")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      await resumeAPI.delete(id)
      setResumes(resumes.filter(r => r._id !== id))
    } catch (err) {
      alert("Failed to delete resume")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Resumes</h1>
          <button
            onClick={() => navigate("/resume/upload")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Upload Resume</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No resumes uploaded yet</p>
            <button
              onClick={() => navigate("/resume/upload")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Upload Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {resume.originalName || resume.filename}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-semibold ${
                      resume.status === 'screened' ? 'text-green-600' : 
                      resume.status === 'parsed' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {resume.status?.charAt(0).toUpperCase() + resume.status?.slice(1) || 'Uploaded'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/resume/${resume._id}`)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-1"
                  >
                    <FaEye />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => navigate(`/resume/${resume._id}/screen`)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-1"
                  >
                    <FaRobot />
                    <span>Screen</span>
                  </button>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
