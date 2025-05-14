import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    quote:
      "The AI Coach helped me achieve my fitness goals faster than I ever thought possible. It's like having a personal trainer in your pocket!",
    author: 'Sarah M.',
    role: 'Fitness Enthusiast',
  },
  {
    quote:
      'Being able to create unlimited workouts and get AI-powered suggestions has completely transformed my training. Best investment in my fitness journey.',
    author: 'Michael R.',
    role: 'Amateur Athlete',
  },
  {
    quote:
      "The personalized meal plans and workout adjustments from the AI Coach have made a huge difference. I'm seeing results I never saw before.",
    author: 'Emma K.',
    role: 'Gym Regular',
  },
]

export function Testimonials() {
  return (
    <div className="mb-12 text-center">
      <h3 className="mb-8 text-2xl font-bold">
        Trusted by 10,000+ Fitness Enthusiasts
      </h3>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
              <div className="font-medium">{testimonial.author}</div>
              <div className="text-muted-foreground text-sm">
                {testimonial.role}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
