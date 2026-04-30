'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: '¿Cuáles son los requisitos para solicitar un crédito?',
    a: 'Solo necesitas ser mayor de 18 años, tener DNI vigente, número de celular activo, cuenta bancaria o billetera digital (Yape, Plin), y correo electrónico. No pedimos recibos de sueldo ni garante.',
  },
  {
    q: '¿Cuánto tiempo tarda en aprobarse mi crédito?',
    a: 'Nuestro sistema de evaluación automática procesa tu solicitud en menos de 5 minutos. Una vez aprobado, el desembolso se realiza en máximo 24 horas hábiles.',
  },
  {
    q: '¿Cuál es la comisión y hay cargos ocultos?',
    a: 'La comisión es del 10% sobre el monto solicitado. No hay costos ocultos, cargos adicionales ni penalidades por pagos anticipados. Lo que ves en el simulador es exactamente lo que pagas.',
  },
  {
    q: '¿Puedo solicitar más de un crédito a la vez?',
    a: 'Para mantener una gestión responsable, solo puedes tener un crédito activo a la vez. Una vez que canceles el crédito vigente, podrás solicitar uno nuevo inmediatamente.',
  },
  {
    q: '¿Qué pasa si no puedo pagar a tiempo?',
    a: 'Te recomendamos contactarnos antes de la fecha de vencimiento. Ofrecemos opciones de reprogramación para ayudarte. Los pagos atrasados generan cargos adicionales según nuestro contrato de crédito.',
  },
  {
    q: '¿Es seguro compartir mis datos personales?',
    a: 'Sí, absolutamente. Usamos encriptación SSL de 256 bits y cumplimos con la Ley de Protección de Datos Personales del Perú (Ley 29733). Tus datos nunca son compartidos con terceros sin tu consentimiento.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Preguntas frecuentes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance mb-4">
            Todo lo que necesitas saber
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Si no encuentras la respuesta que buscas, nuestro chatbot está listo para ayudarte.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                open === i ? 'border-teal/40 bg-teal/5' : 'border-border/50 bg-card/20 hover:border-border'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-semibold text-sm sm:text-base pr-4 leading-relaxed ${open === i ? 'text-white' : 'text-white/80'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  open === i ? 'bg-teal text-navy' : 'bg-secondary text-muted-foreground'
                }`}>
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
