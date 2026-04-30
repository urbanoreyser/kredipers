'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, CheckCircle, Clock, Award } from 'lucide-react'

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Clientes satisfechos', color: 'text-teal' },
  { icon: CheckCircle, value: 98, suffix: '%', label: 'Tasa de aprobación', color: 'text-teal' },
  { icon: Clock, value: 5, suffix: ' min', label: 'Tiempo de aprobación', color: 'text-teal' },
  { icon: Award, value: 4, suffix: ' años', label: 'De experiencia', color: 'text-teal' },
]

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration, start])

  return count
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(stat.value, 1800, visible)
  const Icon = stat.icon

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-teal/30 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-teal" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
        {count.toLocaleString('es-PE')}{stat.suffix}
      </div>
      <p className="text-muted-foreground text-sm">{stat.label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section id="nosotros" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Nuestros números</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
            La confianza de miles de peruanos
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
