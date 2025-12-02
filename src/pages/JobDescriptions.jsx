import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSpinner, FaTrash, FaEdit, FaPlus, FaBriefcase } from "react-icons/fa"
import { jdAPI } from "../utils/api"

export default function JobDescriptions() {
  const [jds, setJds] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    requiredSkills: "",
    experience: "",
    location: ""
  })
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchJDs()
  }, [])

  const fetchJDs = async () => {
    try {
      const response = await jdAPI.getAll()
      setJds(response.data.data || [])
    } catch (err) {
      console.error("Failed to fetch JDs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const data = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s)
    }

    try {
      if (editingId) {
        await jdAPI.update(editingId, data)
      } else {
        await jdAPI.create(data)
      }
      fetchJDs()
      resetForm()
    } catch (err) {
      alert("Failed to save job description")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this job description?")) return
    
    try {
      await jdAPI.delete(id)
      setJds(jds.filter(jd => jd._id !== id))
    } catch (err) {
      alert("Failed to delete")
    }
  }

  const handleEdit = (jd) => {
    setFormData({
      title: jd.title,
      company: jd.company,
      description: jd.description,
      requiredSkills: (jd.skills || jd.requiredSkills || []).join(', '),
      experience: jd.experience,
      location: jd.location
    })
    setEditingId(jd._id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      description: "",
      requiredSkills: "",
      experience: "",
      location: ""
    })
    setEditingId(null)
    setShowForm(false)
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Job Descriptions</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>{showForm ? "Cancel" : "Add New JD"}</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Job Description" : "Create Job Description"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.requiredSkills}
                    onChange={(e) => setFormData({...formData, requiredSkills: e.target.value})}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="2-4 years"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Remote / New York"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {jds.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaBriefcase className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No job descriptions yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First JD
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jds.map((jd) => (
              <div key={jd._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{jd.title}</h3>
                {jd.company && <p className="text-sm text-gray-600 mb-2">{jd.company}</p>}
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{jd.description}</p>
                
                {(jd.skills || jd.requirements) && (jd.skills || jd.requirements).length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {(jd.skills || jd.requirements).slice(0, 5).map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(jd)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(jd._id)}
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
