"use client";
import { Card, CardContent } from "@/components/ui/card";
import { mockAppointments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CalendarWidgetProps {
  className?: string;
}

export function CalendarWidget({ className }: CalendarWidgetProps) {
  const [appointments] = useState(mockAppointments);

  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 to 22:00

  const getAppointmentsForHour = (hour: number) => {
    return appointments.filter((appointment) => {
      const startHour = Number.parseInt(appointment.start.split(":")[0]);
      const endHour = Number.parseInt(appointment.end.split(":")[0]);
      return startHour <= hour && endHour > hour;
    });
  };

  return (
    <Card className={className}>
      <CardContent className="overflow-auto hide-scrollbar max-h-[450px] px-2 py-0">
        <div className="space-y-0.5">
          {hours.map((hour) => {
            const hourAppointments = getAppointmentsForHour(hour);

            return (
              <div
                key={hour}
                className="flex items-start py-1 border-t text-sm"
              >
                <div className="w-10 text-xs text-muted-foreground">
                  {hour}:00
                </div>
                <div className="flex-1 pl-2">
                  {hourAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={cn(
                        "pr-2 mb-0.5 rounded text-xs flex items-stretch gap-2 bg-primary/15",
                      )}
                    >
                      <div className={cn('h-10 rounded-l-sm w-1 bg-primary')} />
                      <div className="flex flex-col justify-center">
                        <div className="font-medium">{appointment.title}</div>
                        <div className="text-xs">
                          {appointment.start} - {appointment.end}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
