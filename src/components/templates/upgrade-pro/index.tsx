import { Header } from './components/header'
import { AiCoachFeature } from './components/ai-coach-feature'
import { PlanComparison } from './components/plan-comparison'
import { Testimonials } from './components/testimonials'
import { FinalCTA } from './components/final-cta'

export function UpgradeToProTemplate() {
  return (
    <div className="mx-auto max-w-6xl">
      <Header />
      <AiCoachFeature />
      <PlanComparison />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}
