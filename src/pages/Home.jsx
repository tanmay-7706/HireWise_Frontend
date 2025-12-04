import { Link } from "react-router-dom"
import { FaRocket, FaFileAlt, FaRobot, FaCheckCircle, FaArrowRight, FaUpload, FaChartLine, FaBriefcase, FaUsers, FaStar, FaQuoteLeft } from "react-icons/fa"
import { isAuthenticated } from "../utils/auth"

export default function Home() {
  const authenticated = isAuthenticated()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-teal-200 dark:bg-teal-900/30 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-full px-4 py-2 mb-8 shadow-sm animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">AI-Powered Career Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Career Journey</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Optimize your resume, practice interviews with AI, and land your dream job faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
            {authenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Go to Dashboard <FaArrowRight className="ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">10K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">50K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Resumes Screened</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">95%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our AI-powered tools give you the competitive edge in today's job market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaFileAlt className="text-2xl text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Resume Screening</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Get instant feedback on your resume. Our AI analyzes formatting, keywords, and content to ensure you pass ATS systems.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRobot className="text-2xl text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Interview Coach</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice with realistic mock interviews. Receive real-time feedback on your answers, tone, and delivery.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="text-2xl text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Career Acceleration</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Track your progress, manage job applications, and get personalized insights to fast-track your career growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get started in minutes and land your dream job faster
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <FaUpload className="text-3xl text-emerald-600 dark:text-emerald-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Upload Resume</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Upload your resume in seconds and let our AI analyze it</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-6">
                <FaChartLine className="text-3xl text-teal-600 dark:text-teal-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Get Insights</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receive detailed feedback and optimization tips</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-6">
                <FaRobot className="text-3xl text-amber-600 dark:text-amber-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Practice Interview</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Practice with AI-powered mock interviews</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <FaBriefcase className="text-3xl text-emerald-600 dark:text-emerald-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Land the Job</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get hired at your dream company with confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Feature Showcase */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-800">
                <div className="space-y-4">
                  <div className="text-6xl">📝</div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Screening</h4>
                  <p className="text-slate-600 dark:text-slate-400">AI-powered analysis to optimize your resume</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Build a Resume That Gets You Noticed
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">ATS-Friendly Formatting</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Ensure your resume passes automated screening systems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Keyword Optimization</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Match job descriptions with relevant keywords</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Instant Feedback</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Get actionable suggestions in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              See what our users have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <FaQuoteLeft className="text-3xl text-emerald-200 dark:text-emerald-900/50 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                "HireWise helped me optimize my resume and land interviews at top tech companies. The AI feedback was incredibly valuable!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold mr-3">
                  SS
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Sarah Smith</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Software Engineer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <FaQuoteLeft className="text-3xl text-emerald-200 dark:text-emerald-900/50 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                "The mock interview feature gave me the confidence I needed. I aced my real interview and got the job!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold mr-3">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Michael Johnson</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Product Manager</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <FaQuoteLeft className="text-3xl text-emerald-200 dark:text-emerald-900/50 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                "Game changer! The career roadmap feature helped me plan my path. Got promoted within 6 months!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold mr-3">
                  EP
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Emily Parker</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Data Analyst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-900 dark:to-teal-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers who are using HireWise to optimize their applications and ace their interviews.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-emerald-600 bg-white hover:bg-emerald-50 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Journey Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/hirewise_favicon.svg" 
                  alt="HireWise Logo" 
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-slate-800 dark:text-slate-200">HireWise</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 max-w-sm">
                Making every job seeker feel valued—no matter the size of your dream. Land your perfect role with AI-powered resume screening and interview coaching.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/resume/upload" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Upload Resume
                  </Link>
                </li>
                <li>
                  <Link to="/career-roadmap" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Career Roadmap
                  </Link>
                </li>
                <li>
                  <Link to="/interview/start" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Mock Interview
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    <span>We're hiring!</span>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-medium">New</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Stay Updated</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Subscribe to our newsletter for career tips, resume insights, and job market trends.
                </p>
              </div>
              <div>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-md hover:shadow-emerald-500/30"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8">
            <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} HireWise. All rights reserved. 
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
