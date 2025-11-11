import { Link } from "react-router-dom"
import { FaBrain, FaFileAlt, FaMicrophone, FaChartLine } from "react-icons/fa"

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Land Your Dream Job with <span className="text-blue-600">AI Precision</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          HireWise uses cutting-edge AI to screen resumes, coach interviews, and unlock career opportunities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <FaBrain className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Resume Screening</h3>
            <p className="text-gray-600">Intelligent resume analysis to highlight your strengths.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <FaFileAlt className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Resume Review</h3>
            <p className="text-gray-600">Detailed feedback to optimize your resume for ATS systems.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <FaMicrophone className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interview Coach</h3>
            <p className="text-gray-600">Practice interviews with AI-powered coaching and feedback.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <FaChartLine className="text-4xl text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Career Insights</h3>
            <p className="text-gray-600">Data-driven insights to guide your career path forward.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals who've landed their dream jobs with HireWise.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg inline-block"
          >
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  )
}
