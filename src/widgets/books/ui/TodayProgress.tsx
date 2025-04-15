import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useBooksStore } from "../lib/useBooksStore";
import { cn } from "@/lib/utils";

const baseChartData = { browser: "safari", fill: "var(--color-primary)" };

const chartConfig = {
  readToday: {
    label: "Read today",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type TodayProgressProps = {
  className?: string;
}

export function TodayProgress({ className }: TodayProgressProps) {

  const progress = useBooksStore(store => store.progress);

  const todayProgress = Number(progress[new Date().toISOString().split("T")[0]]) || 0;
  const dailyMax = 100;
  const todayProgressToRad = Math.round(todayProgress / dailyMax * 360 );

  const chartData = [
    {...baseChartData, readToday: 200, },
  ]


  return (

        <ChartContainer
          config={chartConfig}
          className={cn("p-4 mx-auto aspect-square max-h-[250px]", className)}
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={todayProgressToRad}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="readToday" max={100} background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {todayProgress}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                         Pages read today
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
  )
}
