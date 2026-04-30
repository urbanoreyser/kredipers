'use client'

import { useState } from 'react'
import { X, Eye, EyeOff, CheckCircle, TrendingUp, Loader2 } from 'lucide-react'

interface Props {
  onClose: () => void
}

interface FormData {
  name: string
  dni: string
  email: string
  phone: string
  password: string
}

export default function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    name: '',
    dni: '',
    email: '',
    phone: '',
    password: '',
  })

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1200))

    if (mode === 'register') {
      if (!form.name || !form.dni || !form.email || !form.phone || !form.password) {
        setError('Por favor completa todos los campos.')
        setLoading(false)
        return
      }
      if (form.dni.length !== 8) {
        setError('El DNI debe tener 8 dígitos.')
        setLoading(false)
        return
      }
      if (form.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.')
        setLoading(false)
        return
      }

      const users: FormData[] = JSON.parse(localStorage.getItem('crediper_users') || '[]')
      const exists = users.find((u) => u.email === form.email || u.dni === form.dni)
      if (exists) {
        setError('Ya existe una cuenta con ese DNI o email.')
        setLoading(false)
        return
      }

      users.push(form)
      localStorage.setItem('crediper_users', JSON.stringify(users))
      localStorage.setItem('crediper_session', JSON.stringify({ name: form.name, email: form.email }))
      setLoading(false)
      setSuccess(true)
    } else {
      if (!form.email || !form.password) {
        setError('Por favor ingresa tu email y contraseña.')
        setLoading(false)
        return
      }

      const users: FormData[] = JSON.parse(localStorage.getItem('crediper_users') || '[]')
      const user = users.find((u) => u.email === form.email && u.password === form.password)
      if (!user) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.')
        setLoading(false)
        return
      }

      localStorage.setItem('crediper_session', JSON.stringify({ name: user.name, email: user.email }))
      setLoading(false)
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-teal" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">
            {mode === 'register' ? '¡Cuenta creada!' : '¡Bienvenido de vuelta!'}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === 'register'
              ? `Hola ${form.name.split(' ')[0]}, tu cuenta ha sido creada exitosamente.`
              : 'Has iniciado sesión correctamente.'}
          </p>
          <button
            onClick={() => { onClose(); window.location.reload() }}
            className="w-full py-3 rounded-xl bg-teal text-navy font-bold hover:bg-teal-dark transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal/20 border border-teal/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-teal" />
            </div>
            <span className="text-white font-bold text-lg">CREDI<span className="text-teal">PER</span></span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => { setMode('login'); setError('') }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'login' ? 'text-teal border-b-2 border-teal' : 'text-muted-foreground hover:text-white'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => { setMode('register'); setError('') }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'register' ? 'text-teal border-b-2 border-teal' : 'text-muted-foreground hover:text-white'
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Nombre completo</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:border-teal/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">DNI</label>
                <input
                  type="text"
                  value={form.dni}
                  onChange={(e) => update('dni', e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="12345678"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:border-teal/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Teléfono</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 9))}
                  placeholder="987654321"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:border-teal/60 transition-colors"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Correo electrónico</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="juan@ejemplo.com"
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:border-teal/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Contraseña</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:border-teal/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-destructive text-xs">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-teal text-navy font-bold text-sm hover:bg-teal-dark transition-all disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Procesando...
              </>
            ) : mode === 'login' ? (
              'Iniciar sesión'
            ) : (
              'Crear mi cuenta gratis'
            )}
          </button>

          {mode === 'login' && (
            <p className="text-center text-xs text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <button type="button" onClick={() => setMode('register')} className="text-teal hover:underline">
                Regístrate gratis
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
