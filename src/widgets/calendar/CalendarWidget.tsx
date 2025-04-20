import { Card, CardContent } from "@/components/ui/card";
import { mockAppointments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CommonWidgetProps } from "@/shared/widgets";
import { useState } from "react";

type CalendarWidgetProps = CommonWidgetProps;

const today = new Date();

export function CalendarWidget({ className, w, h }: CalendarWidgetProps) {
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
    <Card className={cn('p-0', className)}>
      <CardContent className="overflow-auto hide-scrollbar px-2 pt-2 pb-0">
        <div className="w-full flex gap-2">
          {Array.from({ length: Math.round(w / 1.5) }, (_, i) => {
            const day = new Date();
            day.setDate(day.getDate() + i);
            const isToday = day.toDateString() === new Date().toDateString();

            return <div className="w-full space-y-0.5" key={i}>
              <div className="flex justify-center items-center gap-1">
                <div className={cn('mb-1 py-1 px-2 rounded-full flex flex-col items-center justify-center',
                  isToday && 'bg-primary text-primary-foreground'
                )}>
                  <div className="text-lg">
                    {day.getDate()}
                  </div>
                  <div className="text-xs">
                    {Intl.DateTimeFormat('en-US', {
                      weekday: 'short'
                      }).format(day)}
                  </div>
                </div>
              </div>
              {hours.map((hour) => {
                const hourAppointments = getAppointmentsForHour(hour);

                return (
                  <div
                    key={hour}
                    className="w-full flex items-start py-1 border-t text-sm"
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
          })}
        </div>
      </CardContent>
    </Card>
  );
}
