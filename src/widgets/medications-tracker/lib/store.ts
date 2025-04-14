import { create } from 'zustand';

export enum ScheduleType {
  EVERYDAY = 'everyday',
  PERIODIC = 'periodic',
}

type Schedule = {
  type: ScheduleType.EVERYDAY
  times: string[];
  dosage: string;
} | {
  type: ScheduleType.PERIODIC
  interval: number;
  times: string[];
  dosage: string;
}

// type UsageHistory = {
//   date: string;
//   time: string;
// }

export type Medicament = {
  id: string;
  name: string;
  dosage: string;
  // usesageHistory: UsageHistory[];
  schedule: Schedule;
  color: string;
}

const mockMedsList: Medicament[] = [
  {
    id: '1',
    color: 'red',
    schedule: {
      type: ScheduleType.EVERYDAY,
      times: ['09:00'],
      dosage: '1 tablet'
    },
    dosage: '1 spoon',
    name: 'Creatine'
  },
  {
    id: '2',
    color: 'blue',
    schedule: {
      type: ScheduleType.EVERYDAY,
      times: ['09:00'],
      dosage: '2 tablets'
    },
    dosage: '2 spoons',
    name: 'Vitamin C'
  },
  {
    id: '3',
    color: 'blue',
    schedule: {
      type: ScheduleType.EVERYDAY,
      times: ['09:00', '17:00'],
      dosage: '1 tablet'
    },
    dosage: '1 tablet',
    name: 'Vitamin D3'
  }
];

type Store = {
  meds: Medicament[];
  addMed: (med: Medicament) => void;
  removeMed: (id: string) => void;
  updateMed: (id: string, updatedData: Partial<Medicament>) => void;
}

export const useMedsStore = create<Store>((set) => ({
  meds: mockMedsList,
  addMed: (med) => set((state) => ({ meds: [...state.meds, med] })),
  removeMed: (id) => set((state) => ({ meds: state.meds.filter((med) => med.id !== id) })),
  updateMed: (id, updatedData) => set((state) => ({
    meds: state.meds.map((med) => med.id === id ? { ...med, ...updatedData } : med)
  })),
}))
