
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { isAuthenticated } from "./utils/auth"
import Navbar from "./components/Navbar"
import { ToastProvider } from "./components/Toast"
import { ConfirmProvider } from "./components/ConfirmModal"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ResumeUpload from "./pages/ResumeUpload"
import Resumes from "./pages/Resumes"
import ResumeScreen from "./pages/ResumeScreen"
import JobDescriptions from "./pages/JobDescriptions"
import InterviewStart from "./pages/InterviewStart"
import InterviewChat from "./pages/InterviewChat"
import CareerRoadmap from "./pages/CareerRoadmap"
import TokenDebug from "./pages/TokenDebug"
import { ThemeProvider } from "./context/ThemeContext"

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ConfirmProvider>
          <Router>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resume/upload"
                  element={
                    <ProtectedRoute>
                      <ResumeUpload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resumes"
                  element={
                    <ProtectedRoute>
                      <Resumes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resume/:id/screen"
                  element={
                    <ProtectedRoute>
                      <ResumeScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/job-descriptions"
                  element={
                    <ProtectedRoute>
                      <JobDescriptions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview/start"
                  element={
                    <ProtectedRoute>
                      <InterviewStart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview/:id"
                  element={
                    <ProtectedRoute>
                      <InterviewChat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/career-roadmap"
                  element={
                    <ProtectedRoute>
                      <CareerRoadmap />
                    </ProtectedRoute>
                  }
                />
                <Route path="/debug" element={<TokenDebug />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </ConfirmProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
