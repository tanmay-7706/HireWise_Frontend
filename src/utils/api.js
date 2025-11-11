import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

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

export default api
