'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { date: 'Mon', weight: 180 },
  { date: 'Tue', weight: 182 },
  { date: 'Wed', weight: 185 },
  { date: 'Thu', weight: 183 },
  { date: 'Fri', weight: 182 },
  { date: 'Sat', weight: 181 },
  { date: 'Sun', weight: 180 },
]

const chartConfig = {
  weight: {
    label: 'Weight',
    theme: {
      light: 'hsl(var(--primary))',
      dark: 'hsl(var(--primary))',
    },
  },
}

export function ProgressChart() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Progress Overview</h2>
        <Select defaultValue="7">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id="weight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value) => `${value} lbs`}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#weight)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
