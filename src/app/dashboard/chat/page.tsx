'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Book, ShoppingCart, Heart, TrendingUp, User, Send } from 'lucide-react'

interface Message {
  type: 'user' | 'bot';
  content: string;
  queryType?: keyof typeof icons;
  title?: string;
  additionalInfo?: string;
  timestamp?: string;
}

const icons = {
  recetas: Book,
  ingredientes: ShoppingCart,
  habitos_saludables: Heart,
  tendencias_locales: TrendingUp,
  personalizacion_alimenticia: User,
}

const ChatPage = () => {
  const [query, setQuery] = useState('')
  const [queryType, setQueryType] = useState<keyof typeof icons>('recetas')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    const userMessage: Message = { type: 'user', content: query, queryType }
    setMessages(prev => [...prev, userMessage])

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryType, query }),
      })

      const data = await res.json()
      const botMessage: Message = { type: 'bot', content: data.content, title: data.title, additionalInfo: data.additionalInfo, timestamp: data.timestamp }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error al enviar la consulta:', error)
      const errorMessage: Message = { type: 'bot', content: 'Lo siento, ha ocurrido un error al procesar tu consulta.' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setQuery('')
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] sm:h-screen w-full bg-green-50">
      <header className="bg-green-300/20 text-green-800 border-b py-4 px-6 items-center justify-center flex flex-col">
        <h1 className="text-xl sm:text-2xl font-bold">Consulta Inteligente de IA</h1>
        <p className="text-sm tracking-tighter text-green-600">Haz tus preguntas sobre recetas, ingredientes, hábitos saludables, tendencias y más.</p>
      </header>

      <main className="flex-grow overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto p-6 space-y-4 pb-32 sm:pb-24">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`max-w-3/4 ${message.type === 'user' ? 'ml-auto bg-green-200' : 'mr-auto bg-white'} rounded-lg p-4 shadow-md`}
            >
              {message.type === 'user' && (
                <div className="flex items-center mb-2">
                  {message.queryType && React.createElement(icons[message.queryType], { className: "w-5 h-5 mr-2 text-green-600" })}
                  <span className="font-semibold text-green-800">{message.queryType}</span>
                </div>
              )}
              <p className={message.type === 'user' ? 'text-green-800' : 'text-gray-800'}>{message.content}</p>
              {message.type === 'bot' && message.additionalInfo && (
                <p className="text-sm text-gray-600 mt-2">{message.additionalInfo}</p>
              )}
              {message.type === 'bot' && message.timestamp && (
                <p className="text-xs text-gray-500 mt-2">{message.timestamp}</p>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23bef264" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />
      </main>

      <footer className="bg-white border-t border-green-200 p-4 fixed bottom-14 sm:bottom-0 left-auto w-full sm:w-[calc(100%-12%)] md:w-[calc(100%-21%)] lg:w-[calc(100%-18%)] xl:w-[calc(100%-16%)] 2xl:w-[calc(100%-12%)]">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          className="w-full pl-4 pr-10 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setQueryType(current => {
            const types = Object.keys(icons) as (keyof typeof icons)[]
            const currentIndex = types.indexOf(current)
            return types[(currentIndex + 1) % types.length]
          })}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 flex items-center space-x-1 focus:outline-none"
        >
          {React.createElement(icons[queryType as keyof typeof icons], { className: "w-5 h-5" })}
          {queryType}
        </button>
          </div>
          <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
          >
        {loading ? 'Enviando...' : (
          <>
            <span className="mr-2">Enviar</span>
            <Send className="w-4 h-4" />
          </>
        )}
          </button>
        </form>
      </footer>
    </div>
  )
}

export default ChatPage