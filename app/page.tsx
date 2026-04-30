'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import BenefitsSection from '@/components/BenefitsSection'
import CreditSimulator from '@/components/CreditSimulator'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import AIChatbot from '@/components/AIChatbot'

export default function Page() {
  const [showAuth, setShowAuth] = useState(false)
  const [showSimulator, setShowSimulator] = useState(false)

  const openAuth = () => setShowAuth(true)
  const openSimulator = () => setShowSimulator(true)

  return (
    <main className="min-h-screen bg-background">
      <Navbar onOpenAuth={openAuth} />

      <HeroSection onOpenAuth={openAuth} onOpenSimulator={openSimulator} />
      <StatsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <FAQSection />
      <CTASection onOpenAuth={openAuth} onOpenSimulator={openSimulator} />
      <Footer />

      {/* Modals */}
      {showSimulator && (
        <CreditSimulator
          onClose={() => setShowSimulator(false)}
          onApply={() => { setShowSimulator(false); setShowAuth(true) }}
        />
      )}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* AI Chatbot */}
      <AIChatbot />
    </main>
  )
}
