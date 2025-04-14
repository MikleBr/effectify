import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

type Habit = {
  id: number;
  icon?: string;
  name: string;
  description?: string;
  group: string;
  doneDates: string[]; // ISO dates
};

type HabitTrackerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  habits: Habit[];
  setHabits: (h: Habit[]) => void;
};

const groups = ["Здоровье", "Продуктивность", "Хобби"];

export function HabitTrackerModal({ isOpen, onClose, habits, setHabits }: HabitTrackerModalProps) {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  // const today = format(new Date(), "yyyy-MM-dd");
  const today = '2025-12-12'

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      group: groups[0],
    },
  });

  const onSubmit = (data: any) => {
    const newHabit: Habit = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      group: data.group,
      doneDates: [],
    };
    setHabits([...habits, newHabit]);
    form.reset();
    setShowAddForm(false);
  };

  const toggleDoneToday = (habitId: number) => {
    setHabits(habits.map(h => {
      if (h.id !== habitId) return h;
      const doneToday = h.doneDates.includes(today);
      return {
        ...h,
        doneDates: doneToday
          ? h.doneDates.filter(date => date !== today)
          : [...h.doneDates, today],
      };
    }));
  };

  const calcStreak = (habit: Habit) => {
    const dates = new Set(habit.doneDates);
    let streak = 0;
    let date = new Date();
    while (dates.has(format(date, "yyyy-MM-dd"))) {
      streak++;
      date.setDate(date.getDate() - 1);
    }
    return streak;
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
    setSelectedHabit(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Трекер привычек</DialogTitle>
        </DialogHeader>

        {habits.length === 0 && !showAddForm && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <p>У вас пока нет привычек</p>
            <Button onClick={() => setShowAddForm(true)} className="mt-4" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Добавить привычку
            </Button>
          </div>
        )}

        {habits.length > 0 && !showAddForm && (
          <>
            <div className="flex justify-end mb-2">
              <Button onClick={() => setShowAddForm(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Добавить привычку
              </Button>
            </div>

            <div className="grid gap-2">
              {habits.map(habit => (
                <Card key={habit.id}>
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <CardTitle className="text-base">{habit.name}</CardTitle>
                    <Button
                      size="sm"
                      variant={habit.doneDates.includes(today) ? "default" : "outline"}
                      onClick={() => toggleDoneToday(habit.id)}
                    >
                      {habit.doneDates.includes(today) ? "Выполнено" : "Отметить"}
                    </Button>
                  </CardHeader>
                  <CardContent className="text-sm px-4 pb-4">
                    <div>{habit.description}</div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2 text-xs underline"
                      onClick={() => setSelectedHabit(habit)}
                    >
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {showAddForm && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Например, Медитация" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание / цель</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Опционально" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Группа</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full p-2 border rounded-md">
                          {groups.map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit">Создать привычку</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {selectedHabit && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-medium mb-2">{selectedHabit.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{selectedHabit.description}</p>
            <p className="text-sm mb-2">Группа: {selectedHabit.group}</p>
            <p className="text-sm mb-2">Серия: {calcStreak(selectedHabit)} дней подряд</p>
            <p className="text-sm mb-2">
              Отмечено: {selectedHabit.doneDates.length} раз
            </p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() => deleteHabit(selectedHabit.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Удалить привычку
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
