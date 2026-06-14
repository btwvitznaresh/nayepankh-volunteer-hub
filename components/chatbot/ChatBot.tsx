'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  'How do I become a volunteer?',
  'What campaigns are active?',
  'How can I donate?',
  'Tell me about NayePankh',
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm **Pankh** 🪶, NayePankh's AI assistant. I can help you with volunteering, campaigns, donations, and more. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(text?: string) {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return

    setInput('')
    const updated: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages([...updated, { role: 'assistant', content: data.reply || data.error }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Sorry, I ran into an issue. Please try again!' }])
    } finally {
      setLoading(false)
    }
  }

  function renderContent(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-brand-500 hover:bg-brand-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-2 transition-colors group"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium hidden group-hover:block pr-1 transition-all">Chat with Pankh</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-500 to-amber-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Pankh AI</div>
                  <div className="text-xs text-orange-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block" /> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn('chat-bubble flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <span className="text-sm">🪶</span>
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-brand-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    )}
                    dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                  />
                </div>
              ))}

              {loading && (
                <div className="chat-bubble flex justify-start">
                  <div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-sm">🪶</span>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Starters (show only on first message) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs bg-orange-50 text-brand-600 border border-orange-100 rounded-full px-3 py-1 hover:bg-orange-100 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask Pankh anything..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all active:scale-95"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
