"use client"

import { TrendingUp } from "lucide-react"
import { Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 50 },
  { month: "February", desktop: 150 },
  { month: "March", desktop: 600 },
  { month: "April", desktop: 150 },
  { month: "May", desktop: 600 },
  { month: "June", desktop: 700 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardDescription/>
      <CardHeader>
        <CardTitle className="antialiased mb-2">Total Spending</CardTitle>
        <div className="mt-4 flex flex-col gap-1">
          <div className="text-3xl font-bold tracking-tight subpixel-antialiased">R 5,231.89</div>
          <div className="flex items-center gap-1 text-xs text-primary antialiased">
            <TrendingUp className="h-4 w-4" />
            +20.1% from last month
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none antialiased">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground antialiased">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
