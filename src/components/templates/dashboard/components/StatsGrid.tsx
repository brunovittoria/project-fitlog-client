import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface Stat {
  name: string
  value: string
  change?: string
  period?: string
  unit?: string
}

interface StatsGridProps {
  stats: Stat[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{stat.value}</p>
              {stat.unit && (
                <span className="ml-1 text-sm text-gray-500">{stat.unit}</span>
              )}
            </div>
            {stat.change && (
              <div className="mt-1 flex items-center text-sm">
                <span className="flex items-center font-medium text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.change}
                </span>
                <span className="ml-1 text-gray-500">{stat.period}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
