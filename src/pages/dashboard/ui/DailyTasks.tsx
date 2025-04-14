import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCAL_STORAGE_KEY = "dailyTasks";

type DailyTasksWidgetProps = {
  className?: string;
};

export default function DailyTasksWidget({ className }: DailyTasksWidgetProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [tasks, setTasks] = useState<
    { id: number; text: string; done: boolean }[]
  >(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), done: false },
    ]);
    setInput("");
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
        <CardDescription>{tasks.filter(it => !it.done).length} tasks today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showCreateForm && (
          <div className="flex gap-2">
            <Input
              placeholder="Добавить задачу..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask}>Добавить</Button>
          </div>
        )}
        {tasks.length === 0 && (
          <div className="text-center text-muted-foreground">
            No tasks today
          </div>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg p-2 bg-muted hover:bg-muted/70"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.done}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}
              >
                {task.text}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTask(task.id)}
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
