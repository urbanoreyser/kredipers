'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, TrendingUp } from 'lucide-react'

interface Message {
  id: number
  role: 'assistant' | 'user'
  content: string
}

const SYSTEM_PROMPT = `Eres el asistente virtual de Crediper, una empresa de créditos express en Perú. Tu nombre es "Crispy".

INFORMACIÓN CLAVE DE CREDIPER:
- Montos disponibles: S/. 100 a S/. 1,000 (en pasos de S/. 50)
- Comisión: 10% sobre el monto solicitado (única comisión, sin costos ocultos)
- Plazos: 1 cuota (pago único) o 2 cuotas (pago en dos partes)
- Ejemplo: Si solicitas S/. 500, pagas S/. 550 (S/. 500 + S/. 50 de comisión)
- Si eliges 2 cuotas con S/. 500: cada cuota es S/. 275 (S/. 550 / 2)
- Requisitos: DNI, email, celular, cuenta bancaria/Yape/Plin. Solo mayores de 18 años.
- Aprobación en menos de 5 minutos. 100% digital.
- Regulado por la SBS del Perú.

SIMULADOR DE PRÉSTAMOS:
Cuando el usuario pida simular un préstamo, calcula así:
- Total a pagar = Monto + (Monto × 10%)
- 1 cuota: paga el total en un solo pago
- 2 cuotas: divide el total entre 2

Responde SIEMPRE en español, de forma amigable, concisa y profesional. Si te preguntan cosas ajenas a finanzas/Crediper, redirige cortésmente a los temas de la empresa.`

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: '¡Hola! Soy Crispy, el asistente virtual de Crediper. Puedo ayudarte a simular tu crédito, resolver dudas sobre nuestros productos o guiarte en tu solicitud. ¿En qué te ayudo hoy?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: Date.now(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('https://llm.blackbox.ai/chat/completions', {
        method: 'POST',
        headers: {
          'customerId': 'cus_UKz8rvB6sEa5U6',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xxx',
        },
        body: JSON.stringify({
          model: 'openrouter/claude-sonnet-4',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
        }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje. Intenta de nuevo.'

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: reply },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Hubo un problema al conectarme. Por favor intenta nuevamente o contáctanos al +51 (01) 234-5678.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickOptions = [
    'Simular S/. 500 a 1 cuota',
    '¿Cuáles son los requisitos?',
    '¿Cómo solicito un crédito?',
    'Simular S/. 1,000 a 2 cuotas',
  ]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full bg-teal text-navy font-bold shadow-xl shadow-teal/30 hover:bg-teal-dark transition-all hover:scale-105 active:scale-95 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">Asistente</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-navy animate-pulse" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[350px] sm:w-[380px] h-[580px] rounded-2xl border border-border shadow-2xl shadow-black/40 overflow-hidden bg-card">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-[#0a0f1e]">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-teal" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0a0f1e]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Crispy</p>
              <p className="text-muted-foreground text-xs">Asistente Crediper · En línea</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                  msg.role === 'assistant' ? 'bg-teal/20 border border-teal/30' : 'bg-secondary'
                }`}>
                  {msg.role === 'assistant' ? (
                    <Bot className="w-3.5 h-3.5 text-teal" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-secondary text-white rounded-tl-sm'
                      : 'bg-teal text-navy font-medium rounded-tr-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-teal" />
                </div>
                <div className="bg-secondary px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 text-teal animate-spin" />
                  <span className="text-muted-foreground text-xs">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick options (only when first message) */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 grid grid-cols-2 gap-1.5">
              {quickOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setInput(opt); setTimeout(() => sendMessage(), 0) }}
                  className="px-3 py-2 rounded-lg border border-border/60 text-xs text-muted-foreground hover:text-teal hover:border-teal/40 transition-colors text-left leading-tight"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border bg-[#0a0f1e]">
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2.5 border border-border focus-within:border-teal/50 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent text-white text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal flex items-center justify-center hover:bg-teal-dark transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5 text-navy" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
