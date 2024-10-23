'use client'
import { ChefHat, Search, Heart, Bot, Calendar, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <ChefHat className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">IA-RECIPE-FINDER</span>
          </motion.div>
          <Link href={'/dashboard'} className="text-green-600 hover:bg-green-200 bg-green-100 border-green-600 py-3 px-7 rounded-full border-2 under font-bold">
            Iniciar Sesión
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            Descubra recetas con IA
          </h1>
          <p className="text-xl text-green-600 mb-8">
            Busca, planifica y cocina deliciosas comidas con el poder de la inteligencia artificial
          </p>
          <form className="flex justify-center">
            <Link href={'/dashboard'} className="bg-green-600 hover:bg-green-700 text-white py-3 px-7 rounded-full shadow-lg">
              Comenzar
            </Link>
          </form>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            { icon: Search, title: 'Búsqueda inteligente', description: 'Encuentra recetas basadas en los ingredientes que tienes' },
            { icon: Bot, title: 'AI Chatbot', description: 'Obtén consejos de cocina y sugerencias de recetas de nuestro asistente AI' },
            { icon: Calendar, title: 'Planificador de comidas', description: 'Planifica tus comidas de la semana con sugerencias basadas en IA' },
            { icon: Heart, title: 'Favoritos', description: 'Guarda y organiza tus recetas favoritas' },
            { icon: Share2, title: 'Comparte Con Tus Amigos', description: 'Comparte tus creaciones culinarias con la comunidad' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <feature.icon className="h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h2>
              <p className="text-green-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <footer className="bg-green-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 IA-RECIPE-FINDER. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}