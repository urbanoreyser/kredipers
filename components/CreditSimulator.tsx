'use client'

import { useState, useMemo } from 'react'
import { X, ChevronRight, CheckCircle2 } from 'lucide-react'

interface Props {
  onClose: () => void
  onApply: () => void
}

const COMMISSION_RATE = 0.10
const MIN_AMOUNT = 100
const MAX_AMOUNT = 1000

function getPaymentDates() {
  const today = new Date()
  const date1 = new Date(today)
  date1.setDate(today.getDate() + 14)
  const date2 = new Date(today)
  date2.setDate(today.getDate() + 30)

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const format = (d: Date) => ({
    dayName: days[d.getDay()],
    date: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`,
    days: Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  })

  return [format(date1), format(date2)]
}

export default function CreditSimulator({ onClose, onApply }: Props) {
  const [tab, setTab] = useState<'unico' | 'cuotas'>('unico')
  const [amount, setAmount] = useState(500)
  const [cuotas, setCuotas] = useState(1)
  const [selectedDate, setSelectedDate] = useState(0)

  const paymentDates = useMemo(() => getPaymentDates(), [])

  const commission = amount * COMMISSION_RATE
  const total = amount + commission

  const cuotaAmount = cuotas > 1 ? total / cuotas : total

  const sliderPercent = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-xl font-bold text-white">Simula tu crédito</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Calcula en tiempo real</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-white/10 p-1 bg-black/20">
            <button
              onClick={() => setTab('unico')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === 'unico' ? 'bg-white text-[#1a0a2e]' : 'text-white/60 hover:text-white'
              }`}
            >
              Pago Único
            </button>
            <button
              onClick={() => { setTab('cuotas'); setCuotas(2) }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === 'cuotas' ? 'bg-white text-[#1a0a2e]' : 'text-white/60 hover:text-white'
              }`}
            >
              Pago en Cuotas
            </button>
          </div>

          {/* Amount */}
          <div>
            <p className="text-white/70 text-sm text-center mb-2">¿Cuánto dinero necesitas?</p>
            <div className="bg-white rounded-xl p-4 text-center mb-4">
              <p className="text-5xl font-light text-gray-800">
                S/. <span className="font-bold">{amount.toLocaleString('es-PE')}</span>
              </p>
            </div>

            <div className="relative">
              <input
                type="range"
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, oklch(0.78 0.18 185) ${sliderPercent}%, oklch(0.25 0.04 240) ${sliderPercent}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>S/. {MIN_AMOUNT}</span>
                <span>S/. {MAX_AMOUNT.toLocaleString('es-PE')}</span>
              </div>
            </div>
          </div>

          {/* Cuotas selection (only for tab cuotas) */}
          {tab === 'cuotas' && (
            <div>
              <p className="text-white/70 text-sm mb-3">¿En cuántas cuotas?</p>
              <div className="flex gap-3">
                {[1, 2].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCuotas(n)}
                    className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      cuotas === n
                        ? 'border-teal bg-teal/20 text-white'
                        : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <span className="font-semibold">{n}</span>
                    {cuotas === n ? (
                      <CheckCircle2 className="w-5 h-5 text-teal fill-teal/30" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/40 mt-2 text-center">Solo disponible 1 o 2 cuotas</p>
            </div>
          )}

          {/* Payment date (only for cuotas) */}
          {tab === 'cuotas' && (
            <div>
              <p className="text-white/70 text-sm mb-3">¿Cuándo prefieres pagar la primera cuota?</p>
              <div className="grid grid-cols-2 gap-3">
                {paymentDates.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedDate === i
                        ? 'border-teal bg-teal/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <p className="text-white/60 text-xs mb-1">{d.dayName}</p>
                    <p className="text-white font-bold text-sm">{d.date}</p>
                    <p className="text-teal text-xs mt-1">En {d.days} días</p>
                    {selectedDate === i && (
                      <div className="flex justify-end mt-1">
                        <CheckCircle2 className="w-4 h-4 text-teal fill-teal/30" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
            <h3 className="text-white font-semibold text-sm mb-3">Resumen de tu crédito</h3>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Monto solicitado</span>
              <span className="text-white">S/. {amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Comisión (10%)</span>
              <span className="text-white">S/. {commission.toFixed(2)}</span>
            </div>
            {tab === 'cuotas' && cuotas > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-white/60">N° de cuotas</span>
                <span className="text-white">{cuotas}</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-3 flex justify-between">
              <span className="text-white font-semibold">
                {tab === 'cuotas' && cuotas > 1 ? 'Cuota mensual' : 'Total a pagar'}
              </span>
              <span className="text-teal font-bold text-xl">
                S/. {tab === 'cuotas' && cuotas > 1 ? cuotaAmount.toFixed(2) : total.toFixed(2)}
              </span>
            </div>
            {tab === 'cuotas' && cuotas > 1 && (
              <div className="flex justify-between text-sm text-white/50">
                <span>Total a pagar</span>
                <span>S/. {total.toFixed(2)}</span>
              </div>
            )}
          </div>

          <button
            onClick={onApply}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-teal text-navy font-bold text-base hover:bg-teal-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Solicitar este crédito
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
