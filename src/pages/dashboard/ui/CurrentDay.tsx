import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type CurrentDayProps = {
  className?: string;
};

export function CurrentDay({ className }: CurrentDayProps) {
  const today = new Date();

  const [api, setApi] = useState<CarouselApi | null>(null);

  const lastWeekDay = new Date(today);
  lastWeekDay.setDate(today.getDate() - 7);

  const newWeekDay = new Date(today);
  newWeekDay.setDate(today.getDate() + 7);

  const curretnWeekDays = getWeekDays(lastWeekDay);
  const prevWeekDays = getWeekDays(today);
  const nextWeekDays = getWeekDays(newWeekDay);

  const todayName = Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(today);

  const nextItemClick = () => {
    if (api) {
      api?.scrollNext();
    }
  };

  const prevItemClick = () => {
    if (api) {
      api?.scrollPrev();
    }
  };


  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="capitalize">
          {todayName}
        </CardTitle>
        <CardDescription>
          {Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(today)}
        </CardDescription>
        <CardAction className="flex gap-1">
          <Button size="icon" variant="outline" onClick={prevItemClick}>
            <ChevronLeft />
          </Button>
          <Button size="icon" variant="outline" onClick={nextItemClick}>
            <ChevronRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Carousel setApi={setApi} opts={{
          align: 'start',
          startIndex: 4,
        }}>
          <CarouselContent>
            {[
              ...prevWeekDays,
              ...curretnWeekDays,
              ...nextWeekDays,
            ].map((day) => {
              const isToday = day.toDateString() === today.toDateString();

              return (
                <CarouselItem className="basis-1/6">
                  <Button
                    size="sm"
                    variant={isToday ? "default" : "outline"}
                    className="size-full flex flex-col gap-0"
                  >
                    <div className={cn('text-secondary-foreground/50 text-sm', isToday && 'text-primary-foreground')}>
                      {Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                      }).format(day)}
                    </div>
                    <div className="text-lg">
                      {Intl.DateTimeFormat("en-US", {
                        day: "2-digit",
                      }).format(day)}
                    </div>
                  </Button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

function getWeekDays(date: Date) {
  const today = new Date(date.getTime());
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);

  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    weekDays.push(day);
  }

  return weekDays;
}
