import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HabitTrackerModal } from "./HabitTrackerModal";
import { PlusIcon } from "lucide-react";

const LOCAL_STORAGE_KEY = "dailyHabits";

const defaultHabits = [
  // { id: 1, icons: "💧", name: "Вода", done: false },
  // { id: 2, icons: "🧘", name: "Медитация", done: false },
  // { id: 3, icons: "📖", name: "Читать", done: false },
  // { id: 4, icons: "🚶", name: "Прогулка", done: false },
  // { id: 5, icons: "🥗", name: "Питание", done: false },
];

type HabitTrackerWidgetProps = {
  className?: string;
};

export function HabitTrackerWidget({ className }: HabitTrackerWidgetProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [habits, setHabits] = useState(defaultHabits);

  // useEffect(() => {
  //   const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (saved) setHabits(JSON.parse(saved));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits));
  // }, [habits]);

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit,
      ),
    );
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Habits</CardTitle>
      </CardHeader>
      <CardContent className="px-0 overflow-hidden">
        {habits.length === 0 && (
          <div className="text-sm text-muted-foreground text-center">
            You have no habits yet
            <div className="mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                 <PlusIcon /> Add Habits
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <HabitTrackerModal
        habits={habits}
        setHabits={setHabits}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Card>
  );
}
