import { TrendingUp, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#060b16] border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal/20 border border-teal/30">
                <TrendingUp className="w-5 h-5 text-teal" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-lg">CREDI<span className="text-teal">PER</span></span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Soluciones Financieras</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Brindamos soluciones financieras rápidas, seguras y transparentes para todos los peruanos.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-teal hover:border-teal/40 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-teal hover:border-teal/40 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-teal hover:border-teal/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Productos</h4>
            <ul className="space-y-3">
              {['Crédito Personal', 'Crédito Express', 'Refinanciamiento', 'Línea de Crédito'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {['Sobre nosotros', 'Blog financiero', 'Trabaja con nosotros', 'Términos y condiciones', 'Política de privacidad'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">+51 (01) 234-5678</p>
                  <p className="text-muted-foreground text-xs">Lun - Vie 8am - 8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">soporte@crediper.pe</p>
                  <p className="text-muted-foreground text-xs">Respuesta en 24h</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Lima, Perú</p>
                  <p className="text-muted-foreground text-xs">Av. Javier Prado 4200</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Crediper. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/20">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-muted-foreground text-xs">Regulado por la SBS del Perú</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
