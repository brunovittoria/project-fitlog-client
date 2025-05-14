import { Card, CardContent } from '@/components/ui/card'
import { Bot, CheckCircle2, Brain } from 'lucide-react'

interface AIMessageProps {
  avatar: React.ReactNode
  message: string
  isUser?: boolean
}

export function AiCoachFeature() {
  const features = [
    'Personalized workout and diet plans',
    'Real-time plan adjustments based on your progress',
    'Nutrition guidance and meal suggestions',
    '24/7 available for questions and support',
  ]

  return (
    <Card className="from-primary to-primary/80 mb-12 bg-gradient-to-br">
      <CardContent className="p-8 text-white">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <div className="mb-4 flex items-center">
              <Bot className="mr-2 h-8 w-8" />
              <h2 className="text-2xl font-bold">Meet Your AI Coach</h2>
            </div>

            <p className="mb-6 text-lg">
              Get personalized workout plans and nutrition advice tailored to
              your goals, schedule, and preferences. Our AI Coach learns and
              adapts with you, ensuring optimal progress.
            </p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="text-primary-foreground/80 mr-2 h-5 w-5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/2">
            <Card className="border-0 bg-white/10">
              <CardContent className="space-y-4 p-6">
                <AIMessage
                  avatar={<Brain className="h-4 w-4" />}
                  message="What's the best workout split for muscle gain with 4 days per week?"
                  isUser
                />
                <AIMessage
                  avatar={<Bot className="h-4 w-4" />}
                  message="Based on your goals, I recommend an Upper/Lower split: Mon: Upper, Tue: Lower, Thu: Upper, Fri: Lower. This maximizes recovery while maintaining frequency..."
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AIMessage({ avatar, message, isUser = false }: AIMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isUser ? 'bg-primary' : 'bg-white/20'
          }`}
        >
          {avatar}
        </div>
      </div>
      <div
        className={`flex-1 rounded-lg p-3 ${
          isUser ? 'bg-white/10' : 'bg-white/5'
        }`}
      >
        {message}
      </div>
    </div>
  )
}
