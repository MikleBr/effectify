
import React, { FormEvent, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"

type TasksDialogProps = {
  tasks: { id: number; text: string; done: boolean }[];
  dialogOpen: boolean;
  onAddTask: (text: string) => void
  onRemoveTask: (id: number) => void
  onToggleTask: (id: number) => void
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export function TasksDialog({
  tasks,
  onToggleTask,
  onRemoveTask,
  onAddTask,
  dialogOpen,
  setDialogOpen,
  children,
}: TasksDialogProps) {
  const [input, setInput] = useState("");

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();

    if (input.trim()) {
      onAddTask(input);
      setInput("");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tasks</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleAddTask} className="flex gap-2">
          <Input
            placeholder="Добавить задачу..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleAddTask}>Добавить</Button>
        </form>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg p-2 bg-muted hover:bg-muted/70"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.done}
                onCheckedChange={() => onToggleTask(task.id)}
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
              onClick={() => onRemoveTask(task.id)}
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
