import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaBriefcase, FaPlus, FaEdit, FaTrash, FaSpinner, FaArrowLeft, FaSearch } from "react-icons/fa"
import { jdAPI } from "../utils/api"

export default function JobDescriptions() {
  const [jds, setJds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    requiredSkills: "",
    experience: "",
    location: "",
  })

  useEffect(() => {
    fetchJDs()
  }, [])

  const fetchJDs = async () => {
    try {
      const response = await jdAPI.getAll()
      setJds(response.data.data)
    } catch (err) {
      console.error("Fetch JDs error:", err)
      setError("Failed to load job descriptions.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (editingId) {
        await jdAPI.update(editingId, formData)
      } else {
        await jdAPI.create(formData)
      }
      await fetchJDs()
      setShowForm(false)
      setEditingId(null)
      setFormData({
        title: "",
        company: "",
        description: "",
        requiredSkills: "",
        experience: "",
        location: "",
      })
    } catch (err) {
      console.error("Save JD error:", err)
      setError("Failed to save job description.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (jd) => {
    setFormData({
      title: jd.title,
      company: jd.company,
      description: jd.description,
      requiredSkills: jd.requiredSkills.join(", "),
      experience: jd.experience,
      location: jd.location,
    })
    setEditingId(jd._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job description?")) return

    try {
      await jdAPI.delete(id)
      setJds(jds.filter((jd) => jd._id !== id))
    } catch (err) {
      console.error("Delete JD error:", err)
      alert("Failed to delete job description.")
    }
  }

  const filteredJDs = jds.filter((jd) =>
    jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jd.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && !showForm) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading job descriptions...</p>
        </div>
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

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Job Descriptions</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage job roles for resume screening</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                title: "",
                company: "",
                description: "",
                requiredSkills: "",
                experience: "",
                location: "",
              })
            }}
            className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30 w-full md:w-auto justify-center"
          >
            {showForm ? "Cancel" : <><FaPlus className="mr-2" /> Add New Job</>}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {editingId ? "Edit Job Description" : "Create New Job Description"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g. Tech Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Detailed job description..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="e.g. React, Node.js, TypeScript"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Experience (years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g. 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g. Remote, New York"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50"
                >
                  {loading ? "Saving..." : (editingId ? "Update Job" : "Create Job")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mb-8 flex items-center">
          <FaSearch className="text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Search job descriptions..."
            className="w-full ml-4 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredJDs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-4xl text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No job descriptions found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Create your first job description to get started"}
            </p>
            {!searchTerm && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-500"
              >
                Create Job Description
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJDs.map((jd) => (
              <div
                key={jd._id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-300 group flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl">
                      <FaBriefcase className="text-2xl text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(jd)}
                        className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(jd._id)}
                        className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{jd.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-4">{jd.company}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium mr-2">Location:</span> {jd.location}
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium mr-2">Experience:</span> {jd.experience} years
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {jd.requiredSkills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {jd.requiredSkills.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md">
                        +{jd.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
