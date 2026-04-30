import { ArrowRight, TrendingUp } from 'lucide-react'

interface Props {
  onOpenAuth: () => void
  onOpenSimulator: () => void
}

export default function CTASection({ onOpenAuth, onOpenSimulator }: Props) {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1a3a 50%, #0a1628 100%)' }}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'oklch(0.78 0.18 185)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal/15 border border-teal/30 mb-6 mx-auto">
          <TrendingUp className="w-8 h-8 text-teal" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white text-balance mb-6">
          Tu crédito está a{' '}
          <span className="text-teal">un clic</span>{' '}
          de distancia
        </h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Miles de peruanos ya confían en Crediper para sus necesidades financieras. Únete hoy y obtén tu crédito en minutos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOpenSimulator}
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-teal text-navy font-bold text-base hover:bg-teal-dark transition-all hover:scale-105 active:scale-95"
          >
            Simular crédito ahora
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenAuth}
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:border-teal/50 hover:bg-teal/5 transition-all"
          >
            Crear cuenta gratis
          </button>
        </div>
      </div>
    </section>
  )
}
