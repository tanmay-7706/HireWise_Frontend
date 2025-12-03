import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log("API Request:", config.method.toUpperCase(), config.url, "- Token present")
    } else {
      console.warn("API Request:", config.method.toUpperCase(), config.url, "- NO TOKEN")
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const authAPI = {
  signup: (data) => api.post("/api/auth/signup", data),
  login: (data) => api.post("/api/auth/login", data),
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },
}

export const userAPI = {
  getProfile: () => api.get("/api/user/me"),
}

export const resumeAPI = {
  upload: (formData) => api.post("/api/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  getAll: (params) => api.get("/api/resume", { params }),
  getById: (id) => api.get(`/api/resume/${id}`),
  update: (id, data) => api.put(`/api/resume/${id}`, data),
  delete: (id) => api.delete(`/api/resume/${id}`),
  screen: (id, jdId) => api.post(`/api/resume/${id}/screen`, { jdId })
}

export const jdAPI = {
  create: (data) => api.post("/api/jd", data),
  getAll: (params) => api.get("/api/jd", { params }),
  getById: (id) => api.get(`/api/jd/${id}`),
  update: (id, data) => api.put(`/api/jd/${id}`, data),
  delete: (id) => api.delete(`/api/jd/${id}`)
}

export const interviewAPI = {
  start: (data) => api.post("/api/interview/start", data),
  getAll: (params) => api.get("/api/interview", { params }),
  getById: (id) => api.get(`/api/interview/${id}`),
  update: (id, data) => api.put(`/api/interview/${id}`, data),
  delete: (id) => api.delete(`/api/interview/${id}`)
}

export const careerAPI = {
  generate: (data) => api.post("/api/career/generate", data),
  getAll: () => api.get("/api/career"),
  getById: (id) => api.get(`/api/career/${id}`),
  delete: (id) => api.delete(`/api/career/${id}`)
}

export default api
