import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Reminder, ScheduleType, useRemindersStore } from "../lib/useRemindersStore";

type DailyTasksWidgetProps = {
  className?: string;
};

export function ReminderWidget({ className }: DailyTasksWidgetProps) {
  const reminders = useRemindersStore(store => store.reminders);

  const todayTasks = getTodayTasks(reminders);


  return (
      <Card className={cn("w-full max-w-md", className)}>
        <CardHeader>
          <CardTitle>Reminder</CardTitle>
          <CardDescription>{todayTasks.length} tasks remaining</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {todayTasks.length === 0 && (
            <div className="text-sm text-muted-foreground text-center">
              No tasks today
              <div className="mt-2">
                <Button size="sm" variant="outline">Create</Button>
              </div>
            </div>
          )}
          {todayTasks.map((task) => (
            <label
              htmlFor={`task-${task.id}`}
              key={task.id}
              className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/70 -mx-2"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`task-${task.id}`}
                  // checked={task.done}
                  // onCheckedChange={() => toggleTask(task.id)}
                />
                <div
                  className={`text-sm`}
                  // "line-through text-muted-foreground"
                >
                  <div>
                    {task.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {task.schedule.type === ScheduleType.EVERYDAY && task.schedule.time}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>
  );
}

const getDateKey = (date: string) => date.split("T")[0];

function getTodayTasks(reminders: Reminder[]) {
  const today = getDateKey(new Date().toISOString());

  return reminders.filter(reminder => {
    if (reminder.schedule.type === ScheduleType.EVERYDAY) return true;

    if (reminder.schedule.type === ScheduleType.ONCE) {
      return today === getDateKey(reminder.schedule.date)
    }

    return false;
  });
}
