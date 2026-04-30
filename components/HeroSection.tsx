'use client'

import { ArrowRight, Shield, Zap, Star } from 'lucide-react'

interface HeroProps {
  onOpenAuth: () => void
  onOpenSimulator: () => void
}

export default function HeroSection({ onOpenAuth, onOpenSimulator }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #080d1a 0%, #0d1530 40%, #1a0a2e 70%, #0d1530 100%)',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(oklch(0.78 0.18 185 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.18 185 / 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, oklch(0.78 0.18 185), transparent)' }} />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, oklch(0.42 0.2 290), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/10 text-teal text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5 fill-teal" />
              <span>#1 Créditos Express en Perú</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
              Crédito rápido,{' '}
              <span className="text-teal">sin complicaciones</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Obtén hasta{' '}
              <span className="text-white font-semibold">S/. 1,000</span>{' '}
              en minutos. Proceso 100% digital, sin papeleos, sin filas. Tu dinero cuando más lo necesitas.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-teal" />
                <span>100% Seguro</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-teal" />
                <span>Aprobación en minutos</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-teal fill-teal" />
                <span>50,000+ clientes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onOpenSimulator}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-teal text-navy font-bold text-base hover:bg-teal-dark transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Simular mi crédito
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenAuth}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:border-teal/50 hover:bg-teal/5 transition-all duration-200"
              >
                Solicitar ahora
              </button>
            </div>
          </div>

          {/* Right: Mini simulator preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ background: 'oklch(0.42 0.2 290)' }} />
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground text-sm mb-1">¿Cuánto necesitas?</p>
                  <p className="text-5xl font-light text-white">S/. <span className="font-bold text-teal">500</span></p>
                </div>

                <div className="mb-6">
                  <div className="relative h-1.5 bg-border rounded-full">
                    <div className="absolute left-0 top-0 h-full w-2/5 bg-teal rounded-full" />
                    <div className="absolute top-1/2 left-2/5 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-teal border-2 border-white shadow-lg" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>S/. 100</span>
                    <span>S/. 1,000</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comisión (10%)</span>
                    <span className="text-white font-medium">S/. 50.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plazo</span>
                    <span className="text-white font-medium">1 cuota</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="text-white font-semibold">Total a pagar</span>
                    <span className="text-teal font-bold text-lg">S/. 550.00</span>
                  </div>
                </div>

                <button
                  onClick={onOpenSimulator}
                  className="w-full py-3 rounded-xl bg-teal text-navy font-bold text-sm hover:bg-teal-dark transition-colors"
                >
                  Ver simulación completa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80V40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0Z" fill="oklch(0.08 0.02 240)" />
        </svg>
      </div>
    </section>
  )
}
