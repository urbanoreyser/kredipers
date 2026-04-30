'use client'

import { useState, useEffect } from 'react'
import { Menu, X, TrendingUp } from 'lucide-react'

interface NavbarProps {
  onOpenAuth: () => void
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('crediper_session')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('crediper_session')
    setUser(null)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080d1a]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0a0f1e]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal/20 border border-teal/30">
              <TrendingUp className="w-5 h-5 text-teal" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight">
                CREDI<span className="text-teal">PER</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Soluciones Financieras</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('productos')} className="text-sm text-muted-foreground hover:text-white transition-colors">
              Productos
            </button>
            <button onClick={() => scrollTo('como-funciona')} className="text-sm text-muted-foreground hover:text-white transition-colors">
              Cómo Funciona
            </button>
            <button onClick={() => scrollTo('nosotros')} className="text-sm text-muted-foreground hover:text-white transition-colors">
              Nosotros
            </button>
            <button onClick={() => scrollTo('faq')} className="text-sm text-muted-foreground hover:text-white transition-colors">
              FAQ
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-teal font-medium">Hola, {user.name.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal text-navy font-semibold text-sm hover:bg-teal-dark transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                Solicitar Evaluación
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0f1e] border-t border-border px-4 py-4 flex flex-col gap-4">
          <button onClick={() => scrollTo('productos')} className="text-sm text-muted-foreground hover:text-white text-left transition-colors">Productos</button>
          <button onClick={() => scrollTo('como-funciona')} className="text-sm text-muted-foreground hover:text-white text-left transition-colors">Cómo Funciona</button>
          <button onClick={() => scrollTo('nosotros')} className="text-sm text-muted-foreground hover:text-white text-left transition-colors">Nosotros</button>
          <button onClick={() => scrollTo('faq')} className="text-sm text-muted-foreground hover:text-white text-left transition-colors">FAQ</button>
          <button
            onClick={() => { onOpenAuth(); setIsOpen(false) }}
            className="w-full py-3 rounded-full bg-teal text-navy font-semibold text-sm"
          >
            Solicitar Evaluación
          </button>
        </div>
      )}
    </nav>
  )
}
