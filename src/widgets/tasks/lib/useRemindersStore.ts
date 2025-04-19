import { create } from "zustand";
import { persist } from "zustand/middleware";

const REMINDER_LOCAL_STORAGE_KEY = "reminders-storage";

export enum ScheduleType {
  ONCE = 'once',
  EVERYDAY = 'everyday',
}

type Schedule = {
  type: ScheduleType.ONCE,
  date: string;
} | {
  type: ScheduleType.EVERYDAY,
  time: string;
};

export type Reminder = {
  id: string;
  title: string;
  description: string;
  schedule: Schedule;
};

type RemindersState = {
  reminders: Reminder[];
};

type RemindersActions = {
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  updateReminder: (id: string, reminder: Partial<Omit<Reminder, "id">>) => void;
  removeReminder: (id: string) => void;
  clearAllReminders: () => void;
};

const mockReminders: Reminder[] = [
  {
    id: crypto.randomUUID(),
    title: "Buy groceries",
    description: "Milk, eggs, bread, cheese",
    schedule: {
      type: ScheduleType.ONCE,
      date: '2025-04-15T12:17:12.953Z',
    },
  },
  {
    id: crypto.randomUUID(),
    title: "Call mom",
    description: "Catch up on family news",
    schedule: {
      type: ScheduleType.EVERYDAY,
      time: '19:00',
    },
  },
];

export const useRemindersStore = create<RemindersState & RemindersActions>()(
  persist(
    (set) => ({
      reminders: mockReminders,

      addReminder: (reminder) =>
        set((state) => ({
          reminders: [...state.reminders, { ...reminder, id: crypto.randomUUID() }],
        })),

      updateReminder: (id, updatedReminder) =>
        set((state) => ({
          reminders: state.reminders.map((reminder) =>
            reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
          ),
        })),

      removeReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((reminder) => reminder.id !== id),
        })),

      clearAllReminders: () => set({ reminders: [] }),
    }),
    { name: REMINDER_LOCAL_STORAGE_KEY },
  ),
);
