'use client'

import { useMemo } from 'react'
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

interface ExercisesChartProps {
  data: {
    date: string
    weight: number
    reps?: number
    sets?: number
  }[]
}

const chartConfig = {
  weight: {
    label: 'Weight (kg)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function ExercisesChart({ data }: ExercisesChartProps) {
  const chartData = useMemo(() => {
    return data
      .map((item) => ({
        date: new Date(item.date),
        weight: item.weight,
        reps: item.reps ?? 1,
        sets: item.sets ?? 1,
        volume: (item.weight ?? 0) * (item.reps ?? 1) * (item.sets ?? 1),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => ({
        ...item,
        date: item.date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      }))
  }, [data])

  if (!chartData || chartData.length < 2) {
    return (
      <div className="flex h-48 w-full items-center justify-center p-4">
        <p className="text-muted-foreground text-center text-sm">
          Not enough data to display a chart.
          <br />
          At least two progress points are needed.
        </p>
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          dataKey="weight"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}`}
          domain={['dataMin - 5', 'dataMax + 5']}
        />
        <ChartTooltip
          cursor
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="weight"
          type="monotone"
          stroke={chartConfig.weight.color}
          strokeWidth={2}
          dot={{
            fill: chartConfig.weight.color,
          }}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          dataKey="volume"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{
            fill: '#8884d8',
          }}
          activeDot={{
            r: 6,
          }}
          name="Volume (kg x reps x sets)"
        />
      </LineChart>
    </ChartContainer>
  )
}
