import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaPaperPlane, FaRobot, FaUser, FaSpinner, FaArrowLeft, FaMicrophone } from "react-icons/fa"
import { interviewAPI } from "../utils/api"

export default function InterviewChat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [interview, setInterview] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchInterview()
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchInterview = async () => {
    try {
      const response = await interviewAPI.getById(id)
      setInterview(response.data.data)
      
      // Simulate initial greeting if no messages
      if (!response.data.data.questions || response.data.data.questions.length === 0) {
        setMessages([
          {
            id: 1,
            sender: "ai",
            text: `Hello! I'm your AI interviewer. I see you're applying for the ${response.data.data.type || 'position'}. Are you ready to start?`,
            timestamp: new Date()
          }
        ])
      } else {
        // Load existing messages (mock mapping for now as backend structure is different)
        // In a real scenario, we would map the questions/answers to chat messages
      }
    } catch (err) {
      console.error("Fetch interview error:", err)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setSending(true)

    try {
      // Build context from recent messages
      const recentMessages = messages.slice(-5).map(m => 
        `${m.sender === 'user' ? 'Candidate' : 'Interviewer'}: ${m.text}`
      ).join('\n')

      // Call Gemini AI via backend
      const response = await interviewAPI.chat(id, {
        message: input,
        jobTitle: interview?.type || 'mock',
        context: recentMessages
      })

      if (response.data.success) {
        const aiMessage = {
          id: messages.length + 2,
          sender: "ai",
          text: response.data.data.message,
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error(response.data.message)
      }
    } catch (err) {
      console.error("AI response error:", err)
      // Fallback message if AI fails
      const errorMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: "I apologize, but I'm having trouble connecting right now. Let's try again. Could you repeat your last response?",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading interview session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/interview/start")}
            className="mr-4 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <FaRobot className="mr-2 text-emerald-600 dark:text-emerald-400" />
              AI Interviewer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {interview?.type || "Mock Interview"} Session
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 dark:bg-slate-900">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                msg.sender === "user" 
                  ? "bg-emerald-100 dark:bg-emerald-900/50 ml-3" 
                  : "bg-white dark:bg-slate-700 mr-3 border border-slate-200 dark:border-slate-600"
              }`}>
                {msg.sender === "user" ? (
                  <FaUser className="text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <FaRobot className="text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none"
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-xs mt-2 ${
                  msg.sender === "user" ? "text-emerald-200" : "text-slate-400"
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {sending && (
          <div className="flex justify-start">
            <div className="flex flex-row">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white dark:bg-slate-700 mr-3 border border-slate-200 dark:border-slate-600 flex items-center justify-center">
                <FaRobot className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-400 transition-all shadow-inner"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="absolute right-2 p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:hover:bg-emerald-600 shadow-md"
            >
              {sending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  )
}
