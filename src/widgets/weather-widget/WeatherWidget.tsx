import { Card } from "@/components/ui/card";
import { Sun, CloudRain, Snowflake } from "lucide-react";

type WeatherWidgetProps = {
  className?: string;
};

export function WeatherWidget({ className }: WeatherWidgetProps) {
  const weather = {
    location: "Saint Petersburg",
    temperature: 18,
    condition: "sunny",
  }

  const icon = {
    sunny: <Sun className="size-12 text-yellow-500" />,
    rainy: <CloudRain className="size-12 text-blue-500" />,
    snowy: <Snowflake className="size-12 text-cyan-400" />,
  }[weather.condition]

  return (
    <Card className={className}>
     <div className="w-full h-full flex flex-col items-center justify-center">
       {icon}
       <div className="text-2xl font-semibold mt-2">{weather.temperature}°C</div>
       <div className="text-xs text-muted-foreground">{weather.location}</div>
     </div>
    </Card>
  )
}
