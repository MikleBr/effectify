// Types
export type Appointment = {
  id: string
  title: string
  start: string
  end: string
  type: "work" | "personal" | "rest"
}

export type Medication = {
  id: string
  name: string
  icon: string
  dosage: string
  timeOfDay: "morning" | "afternoon" | "evening"
  taken: boolean
}

export type Meal = {
  id: string
  name: string
  type: "breakfast" | "lunch" | "dinner" | "snack"
  calories: number
  protein: number
  fat: number
  carbs: number
  recipeUrl?: string
}

export type MealPlan = {
  breakfast: Meal[]
  lunch: Meal[]
  dinner: Meal[]
  snack: Meal[]
}

export type Book = {
  id: string
  title: string
  author: string
  currentPage: number
  totalPages: number
  dailyGoal: number
}

// Mock data
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: "09:00",
    end: "10:00",
    type: "work",
  },
  {
    id: "2",
    title: "Lunch with Alex",
    start: "12:30",
    end: "13:30",
    type: "personal",
  },
  {
    id: "3",
    title: "Gym Session",
    start: "18:00",
    end: "19:00",
    type: "rest",
  },
  {
    id: "4",
    title: "Project Planning",
    start: "14:00",
    end: "15:30",
    type: "work",
  },
]

export const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Vitamin D",
    icon: "pill",
    dosage: "1000 IU",
    timeOfDay: "morning",
    taken: false,
  },
  {
    id: "2",
    name: "Omega-3",
    icon: "capsule",
    dosage: "1 capsule",
    timeOfDay: "morning",
    taken: true,
  },
  {
    id: "3",
    name: "Magnesium",
    icon: "pill",
    dosage: "400mg",
    timeOfDay: "evening",
    taken: false,
  },
]

export const mockMealPlan: MealPlan = {
  breakfast: [
    {
      id: "b1",
      name: "Oatmeal with berries and nuts",
      type: "breakfast",
      calories: 350,
      protein: 12,
      fat: 14,
      carbs: 45,
      recipeUrl: "/recipes/oatmeal",
    },
    {
      id: "b2",
      name: "Greek yogurt with honey",
      type: "breakfast",
      calories: 180,
      protein: 15,
      fat: 5,
      carbs: 12,
    },
  ],
  lunch: [
    {
      id: "l1",
      name: "Grilled chicken salad with avocado",
      type: "lunch",
      calories: 420,
      protein: 35,
      fat: 22,
      carbs: 18,
      recipeUrl: "/recipes/chicken-salad",
    },
  ],
  dinner: [
    {
      id: "d1",
      name: "Salmon with roasted vegetables",
      type: "dinner",
      calories: 480,
      protein: 32,
      fat: 28,
      carbs: 22,
      recipeUrl: "/recipes/salmon",
    },
  ],
  snack: [
    {
      id: "s1",
      name: "Apple with almond butter",
      type: "snack",
      calories: 220,
      protein: 5,
      fat: 12,
      carbs: 25,
    },
    {
      id: "s2",
      name: "Protein shake",
      type: "snack",
      calories: 160,
      protein: 25,
      fat: 3,
      carbs: 8,
    },
  ],
}

export const mockMeals: Meal[] = [
  ...mockMealPlan.breakfast,
  ...mockMealPlan.lunch,
  ...mockMealPlan.dinner,
  ...mockMealPlan.snack,
]

export const mockBook: Book = {
  id: "1",
  title: "Atomic Habits",
  author: "James Clear",
  currentPage: 120,
  totalPages: 320,
  dailyGoal: 20,
}
