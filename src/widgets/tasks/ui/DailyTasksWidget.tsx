import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";
import { TasksDialog } from "./TasksDialog";

const LOCAL_STORAGE_KEY = "dailyTasks";

type DailyTasksWidgetProps = {
  className?: string;
};

export function DailyTasksWidget({ className }: DailyTasksWidgetProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const [tasks, setTasks] = useState<
    { id: number; text: string; done: boolean }[]
  >(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: string) => {
    if (!task.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: task.trim(), done: false },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
      <Card className={cn("w-full max-w-md", className)}>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>{tasks.filter(it => !it.done).length} tasks remaining</CardDescription>
          <CardAction>
            <TasksDialog
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              onAddTask={addTask}
              onRemoveTask={removeTask}
              onToggleTask={toggleTask}
              tasks={tasks}
            >
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </TasksDialog>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.length === 0 && (
            <div className="text-sm text-muted-foreground text-center">
              No tasks today
              <div className="mt-2">
                <Button size="sm" variant="outline" onClick={() => {
                  setDialogOpen(true)
                }}>Create</Button>
              </div>
            </div>
          )}
          {tasks.map((task) => (
            <label
              htmlFor={`task-${task.id}`}
              key={task.id}
              className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/70 -mx-2"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span
                  className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.text}
                </span>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>
  );
}
