import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
];

type MenuItem = {
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
};

type Menu = {
  [key: string]: MenuItem[];
};

const initialMenu: Menu = {
  breakfast: [
    {
      name: "Oatmeal with berries",
      calories: 320,
      proteins: 8,
      fats: 6,
      carbs: 55,
    },
  ],
  lunch: [
    {
      name: "Grilled chicken with rice",
      calories: 480,
      proteins: 35,
      fats: 12,
      carbs: 40,
    },
  ],
  dinner: [
    {
      name: "Vegetable stew",
      calories: 350,
      proteins: 10,
      fats: 15,
      carbs: 30,
    },
  ],
  snacks: [
    {
      name: "Nuts",
      calories: 200,
      proteins: 5,
      fats: 18,
      carbs: 5,
    },
    {
      name: "Protein Shake",
      calories: 150,
      proteins: 30,
      fats: 2,
      carbs: 25,
    },
  ],
}

type MealPlannerWidgetProps = {
  className?: string;
};

export function MealPlannerWidget({ className }: MealPlannerWidgetProps) {
  const [menu] = useState(initialMenu);

  const totals = Object.values(menu).flat().reduce(
    (acc, item) => {
      acc.calories += item.calories || 0
      acc.proteins += item.proteins || 0
      acc.fats += item.fats || 0
      acc.carbs += item.carbs || 0
      return acc
    },
    { calories: 0, proteins: 0, fats: 0, carbs: 0 }
  )

  return (
    <Card className={cn('pb-0', className)}>
      <CardHeader>
        <CardTitle>Daily Menu</CardTitle>
        <CardDescription>
          {totals.calories} kcal
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto hide-scrollbar pb-6">
        {SECTIONS.map(({ id, label }) => (
          <div key={id} className="space-y-1 mt-2 first:mt-0">
            <h4 className="text-sm text-muted-foreground">{label}</h4>
            <div className="space-y-1">
              {menu[id]?.map((item, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Calories: {item.calories} kcal</p>
                      <p>Protein: {item.proteins} g</p>
                      <p>Fats: {item.fats} g</p>
                      <p>Carbs: {item.carbs} g</p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
