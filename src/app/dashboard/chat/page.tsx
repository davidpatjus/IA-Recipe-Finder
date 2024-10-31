"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Book,
  ShoppingCart,
  Heart,
  TrendingUp,
  User,
  Send,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface Message {
  type: "user" | "bot";
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
};

const MAX_RETRY_COUNT = 3; 
const MAX_MESSAGE_LENGTH = 500; 
const RETRY_DELAY_MS = 2000;
const MAX_VISIBLE_LENGTH = 500;

const ChatPage = () => {
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState<keyof typeof icons>("recetas");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    if (query.length > MAX_MESSAGE_LENGTH) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `El mensaje es demasiado largo. Por favor, reduce a menos de ${MAX_MESSAGE_LENGTH} caracteres.`,
        },
      ]);
      return;
    }

    const userMessage: Message = { type: "user", content: query, queryType };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    await sendMessage(query, queryType);
  };

  const sendMessage = async (
    message: string,
    type: keyof typeof icons
  ) => {
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryType: type, query: message }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: data.content,
          title: data.title,
          additionalInfo: data.additionalInfo,
          timestamp: data.timestamp,
        },
      ]);
      setRetryCount(0); 
    } catch (error) {
      console.error("Error al enviar la consulta:", error);

      if (retryCount < MAX_RETRY_COUNT) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          sendMessage(message, type); 
        }, RETRY_DELAY_MS);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Lo siento, no hemos podido procesar tu consulta. Por favor, verifica tu conexión e inténtalo nuevamente más tarde.",
          },
        ]);
        setRetryCount(0); 
      }
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = (message: Message) => {
    const isLongMessage = message.content.length > MAX_VISIBLE_LENGTH;

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const displayedContent = isExpanded
      ? message.content
      : message.content.slice(0, MAX_VISIBLE_LENGTH) + "...";

    return (
      <>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {displayedContent}
        </ReactMarkdown>
        {isLongMessage && (
          <button
            onClick={toggleExpand}
            className="text-blue-500 text-sm underline mt-2"
          >
            {isExpanded ? "Ver menos" : "Ver más"}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] sm:h-screen w-full bg-green-50">
      <header className="bg-green-300/20 text-green-800 border-b py-4 px-6 items-center justify-center flex flex-col">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 font-bold">
          Consulta Inteligente de IA
        </h1>
        <p className="text-sm sm:text-base xl:text-lg tracking-tighter text-green-600">
          Haz tus preguntas sobre recetas, ingredientes, hábitos saludables,
          tendencias y más.
        </p>
      </header>

      <main className="flex-grow overflow-hidden relative bg-gradient-to-b from-green-100/60 to-white">
        <div className="absolute inset-0 overflow-y-auto p-6 space-y-4 pb-32 sm:pb-24">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`max-w-3/4 ${
                message.type === "user"
                  ? "ml-auto bg-green-200"
                  : "mr-auto bg-white"
              } rounded-lg p-4 shadow-md`}
            >
              {message.type === "user" && (
                <div className="flex items-center mb-2">
                  {message.queryType &&
                    React.createElement(icons[message.queryType], {
                      className: "w-5 h-5 mr-2 text-green-600",
                    })}
                  <span className="font-semibold text-green-800">
                    {message.queryType}
                  </span>
                </div>
              )}
              {message.type === "bot" ? (
                renderMessageContent(message)
              ) : (
                <p className="text-green-800">{message.content}</p>
              )}
              {message.type === "bot" && message.additionalInfo && (
                <p className="text-sm text-gray-600 mt-2">
                  {message.additionalInfo}
                </p>
              )}
              {message.type === "bot" && message.timestamp && (
                <p className="text-xs text-gray-500 mt-2">
                  {message.timestamp}
                </p>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
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
              onClick={() =>
                setQueryType((current) => {
                  const types = Object.keys(icons) as (keyof typeof icons)[];
                  const currentIndex = types.indexOf(current);
                  return types[(currentIndex + 1) % types.length];
                })
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 flex items-center space-x-1 focus:outline-none"
            >
              <span className="bg-green-100 rounded-full py-1 px-2 flex flex-row items-center gap-1">
                {React.createElement(icons[queryType], {
                  className: "w-5 h-5",
                })}
                <span className="hidden sm:block"> {queryType} </span>
              </span>
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              "Enviando..."
            ) : (
              <>
                <span className="mr-2">Enviar</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;
