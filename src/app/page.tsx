'use client'

import { LandingLayout } from '@/components/layouts/LandingLayout'
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

export default function Home() {
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
