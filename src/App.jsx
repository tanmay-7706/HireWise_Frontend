import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { isAuthenticated } from "./utils/auth"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ResumeUpload from "./pages/ResumeUpload"
import Resumes from "./pages/Resumes"
import ResumeScreen from "./pages/ResumeScreen"
import JobDescriptions from "./pages/JobDescriptions"
import InterviewStart from "./pages/InterviewStart"
import TokenDebug from "./pages/TokenDebug"

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
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
        <Route path="/debug" element={<TokenDebug />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
