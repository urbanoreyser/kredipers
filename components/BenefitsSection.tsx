import { ShieldCheck, Smartphone, Clock, HeadphonesIcon, Percent, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Seguridad garantizada',
    desc: 'Tus datos están protegidos con encriptación de 256 bits. Cumplimos con todas las normativas de la SBS.',
  },
  {
    icon: Smartphone,
    title: '100% digital',
    desc: 'Todo el proceso desde tu celular o computadora. Sin visitas a oficinas, sin filas, sin papeleos.',
  },
  {
    icon: Clock,
    title: 'Respuesta inmediata',
    desc: 'Sistema de evaluación automática. Sabrás si tu crédito fue aprobado en menos de 5 minutos.',
  },
  {
    icon: Percent,
    title: 'Tasas transparentes',
    desc: 'Sin costos ocultos. La comisión es del 10% sobre el monto solicitado. Eso es todo, nada más.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte 24/7',
    desc: 'Nuestro equipo y chatbot con IA están disponibles en cualquier momento para ayudarte.',
  },
  {
    icon: TrendingUp,
    title: 'Mejora tu historial',
    desc: 'Reportamos tus pagos puntuales a las centrales de riesgo. ¡Construye un mejor historial crediticio!',
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="productos"
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #0d1530 0%, #1a0a2e 50%, #0d1530 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Por qué elegirnos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance mb-4">
            Beneficios que marcan la diferencia
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Diseñamos cada aspecto de Crediper pensando en tu comodidad, seguridad y bienestar financiero.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.title}
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-teal/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/15 border border-teal/25 flex items-center justify-center mb-4 group-hover:bg-teal/25 transition-colors">
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
