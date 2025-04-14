import { CalendarWidget } from "@/widgets/calendar";
import { BooksWidget } from "@/widgets/books";
import { MedsTrackerWidget } from "@/widgets/medications-tracker";
import { DailyTasksWidget } from "@/widgets/tasks";
import { HabitTrackerWidget } from "@/widgets/habits-tracker";
import { MealPlannerWidget } from "@/widgets/meal-planner";
import { Card, CardContent } from "@/components/ui/card";

import { CurrentDay } from "./ui/CurrentDay";
import { PomodoroWidget } from "./ui/PomadoroWidget";
import { AiWidget } from "@/widgets/ai-widget";

export function DashdoradPage() {
  return (
    <>
      <div className="max-h-screen h-full grid gap-6 grid-cols-[repeat(12,80px)]">
        <div className="h-full max-h-full col-span-4 flex flex-col gap-6">
          <div
            className="w-full"
            style={{
              height: getColsSize(2),
            }}
          >
            <CurrentDay className="w-full h-full" />
          </div>
          <div className="w-full" style={{
            height: getColsSize(5),
          }}>
            <CalendarWidget className="size-full" />
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-4">
          <div className="grid grid-cols-4 gap-6" style={{
            height: getColsSize(2),
          }}>
            <div className="col-span-2 aspect-square">
              <MedsTrackerWidget className="w-full h-full" />
            </div>
            <div className="col-span-2 aspect-square">
              <HabitTrackerWidget className="h-full" />
            </div>
          </div>
          <div style={{
            height: getColsSize(2),
          }}>
            <AiWidget className="size-full" />
          </div>
          <div style={{
            height: getColsSize(3),
          }}>
            <DailyTasksWidget className="size-full" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          <div className="w-full" style={{
            height: getColsSize(3),
          }}>
            <MealPlannerWidget className="size-full" />
          </div>
          <Card style={
            {
              height: getColsSize(2),
            }
          }>
            <CardContent className="flex flex-col justify-center h-full">
              <div className="flex gap-1">
                  <span className="text-2xl text-primary">“</span>
                <blockquote className="italic">
                  We cannot solve problems with the kind of thinking we employed when we came up with them.
                </blockquote>
              </div>
              <div className="ml-3 mt-2 text-muted-foreground">
                Albert Einstein
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-4 gap-6" style={{
            height: getColsSize(2),
          }}>
            <div className="col-span-2 h-full">
              <BooksWidget className="aspect-square w-full h-full" />
            </div>
            <div className="col-span-2 h-full">
              <PomodoroWidget className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const getColsSize = (cols: number) => {
  return `${cols * 80 + (cols - 1) * 24}px`;
};
