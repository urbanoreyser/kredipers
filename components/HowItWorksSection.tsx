import { UserCheck, Calculator, FileCheck, Banknote } from 'lucide-react'

const steps = [
  {
    icon: Calculator,
    step: '01',
    title: 'Simula tu crédito',
    desc: 'Usa nuestro simulador para calcular el monto, plazo y cuotas que mejor se adapten a tu presupuesto.',
  },
  {
    icon: UserCheck,
    step: '02',
    title: 'Regístrate gratis',
    desc: 'Crea tu cuenta en menos de 2 minutos con tu DNI, email y número de celular. Sin costo alguno.',
  },
  {
    icon: FileCheck,
    step: '03',
    title: 'Solicita y espera aprobación',
    desc: 'Nuestro sistema evalúa tu solicitud automáticamente. Recibirás respuesta en minutos por tu celular.',
  },
  {
    icon: Banknote,
    step: '04',
    title: 'Recibe tu dinero',
    desc: 'Una vez aprobado, el dinero se deposita directamente en tu cuenta bancaria o billetera digital.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-2">Proceso simple</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance mb-4">
            ¿Cómo funciona Crediper?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            En solo 4 pasos obtienes tu crédito de forma rápida, segura y completamente en línea.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-teal/40 to-transparent z-0" style={{ width: 'calc(100% - 2rem)' }} />
                )}

                <div className="relative z-10 p-6 rounded-2xl border border-border/50 bg-card/20 hover:border-teal/30 hover:bg-card/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal/5 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center">
                    <span className="text-teal text-xs font-bold">{step.step}</span>
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal/20 to-purple/20 border border-teal/20 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-teal" />
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
