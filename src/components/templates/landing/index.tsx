'use client'

import { LandingLayout } from '../../../layouts/LandingLayout'
import { Hero } from '@/components/landing/Hero'
import { Sponsors } from '@/components/landing/Sponsors'
import { About } from '@/components/landing/About'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { Services } from '@/components/landing/Services'
import { Cta } from '@/components/landing/Cta'
import { Testimonials } from '@/components/landing/Testimonials'
import { Team } from '@/components/landing/Team'
import { Pricing } from '@/components/landing/Pricing'
import { Newsletter } from '@/components/landing/Newsletter'
import { FAQ } from '@/components/landing/FAQ'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function LandingTemplate() {
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  return (
    <LandingLayout>
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
    </LandingLayout>
  )
}
