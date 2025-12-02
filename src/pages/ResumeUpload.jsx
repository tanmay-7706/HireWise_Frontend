import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUpload, FaSpinner, FaCheckCircle, FaFilePdf } from "react-icons/fa"
import { resumeAPI } from "../utils/api"

export default function ResumeUpload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setError("")
    } else {
      setError("Please select a PDF file")
      setFile(null)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a file")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append("resume", file)

      await resumeAPI.upload(formData)
      setSuccess(true)
      setFile(null)
      
      setTimeout(() => {
        navigate("/resumes")
      }, 1500)

    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Resume</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
              <FaCheckCircle />
              <span>Resume uploaded successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <FaFilePdf className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-700 mb-2">
                  {file ? file.name : "Click to select PDF file"}
                </p>
                <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <FaSpinner className="animate-spin" />}
              <FaUpload />
              <span>{loading ? "Uploading..." : "Upload Resume"}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/resumes")}
              className="text-blue-600 hover:underline"
            >
              View all resumes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
