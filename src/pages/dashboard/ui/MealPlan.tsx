"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Coffee, Edit2, Plus, Trash2, UtensilsCrossed, Utensils, Apple } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Meal, MealPlan } from "@/lib/mock-data"

interface MealPlanWidgetProps {
  meals: Meal[]
  className?: string
}

export function MealPlanWidget({ meals, className }: MealPlanWidgetProps) {
  // Convert flat meals array to MealPlan structure
  const initialMealPlan: MealPlan = {
    breakfast: meals.filter((meal) => meal.type === "breakfast"),
    lunch: meals.filter((meal) => meal.type === "lunch"),
    dinner: meals.filter((meal) => meal.type === "dinner"),
    snack: meals.filter((meal) => meal.type === "snack"),
  }

  const [mealPlan, setMealPlan] = useState<MealPlan>(initialMealPlan)
  const [isEditing] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    name: "",
    type: "breakfast",
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  })

  const calculateTotalMacros = (meals: Meal[]) => {
    return meals.reduce(
      (acc, meal) => {
        return {
          calories: acc.calories + meal.calories,
          protein: acc.protein + meal.protein,
          fat: acc.fat + meal.fat,
          carbs: acc.carbs + meal.carbs,
        }
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 },
    )
  }

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.type) return

    const meal: Meal = {
      id: `new-${Date.now()}`,
      name: newMeal.name || "",
      type: newMeal.type as Meal["type"],
      calories: newMeal.calories || 0,
      protein: newMeal.protein || 0,
      fat: newMeal.fat || 0,
      carbs: newMeal.carbs || 0,
      recipeUrl: newMeal.recipeUrl,
    }

    setMealPlan((prev) => ({
      ...prev,
      [meal.type]: [...prev[meal.type], meal],
    }))

    setNewMeal({
      name: "",
      type: "breakfast",
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    })
  }

  const handleUpdateMeal = () => {
    if (!editingMeal) return

    setMealPlan((prev) => {
      // Remove from old type if type changed
      const oldType = meals.find((m) => m.id === editingMeal.id)?.type || editingMeal.type

      const updatedPlan = { ...prev }

      if (oldType !== editingMeal.type) {
        updatedPlan[oldType] = updatedPlan[oldType].filter((m) => m.id !== editingMeal.id)
        updatedPlan[editingMeal.type] = [...updatedPlan[editingMeal.type], editingMeal]
      } else {
        updatedPlan[editingMeal.type] = updatedPlan[editingMeal.type].map((m) =>
          m.id === editingMeal.id ? editingMeal : m,
        )
      }

      return updatedPlan
    })

    setEditingMeal(null)
  }

  const handleDeleteMeal = (id: string, type: Meal["type"]) => {
    setMealPlan((prev) => ({
      ...prev,
      [type]: prev[type].filter((meal) => meal.id !== id),
    }))
  }

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal({ ...meal })
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 overflow-hidden">
        <div className="h-full flex flex-col gap-3 overflow-y-auto">
          {/* Breakfast Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Coffee className="h-4 w-4" />
                <h3 className="font-medium text-sm">Breakfast</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {calculateTotalMacros(mealPlan.breakfast).calories} kcal | P:{" "}
                {calculateTotalMacros(mealPlan.breakfast).protein}g | F: {calculateTotalMacros(mealPlan.breakfast).fat}g
                | C: {calculateTotalMacros(mealPlan.breakfast).carbs}g
              </div>
            </div>
            <div className="space-y-1">
              {mealPlan.breakfast.map((meal) => (
                <MealItem
                  key={meal.id}
                  meal={meal}
                  isEditing={isEditing}
                  onEdit={handleEditMeal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          </div>

          {/* Lunch Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                <h3 className="font-medium text-sm">Lunch</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {calculateTotalMacros(mealPlan.lunch).calories} kcal | P: {calculateTotalMacros(mealPlan.lunch).protein}
                g | F: {calculateTotalMacros(mealPlan.lunch).fat}g | C: {calculateTotalMacros(mealPlan.lunch).carbs}g
              </div>
            </div>
            <div className="space-y-1">
              {mealPlan.lunch.map((meal) => (
                <MealItem
                  key={meal.id}
                  meal={meal}
                  isEditing={isEditing}
                  onEdit={handleEditMeal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          </div>

          {/* Dinner Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <UtensilsCrossed className="h-4 w-4" />
                <h3 className="font-medium text-sm">Dinner</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {calculateTotalMacros(mealPlan.dinner).calories} kcal | P:{" "}
                {calculateTotalMacros(mealPlan.dinner).protein}g | F: {calculateTotalMacros(mealPlan.dinner).fat}g | C:{" "}
                {calculateTotalMacros(mealPlan.dinner).carbs}g
              </div>
            </div>
            <div className="space-y-1">
              {mealPlan.dinner.map((meal) => (
                <MealItem
                  key={meal.id}
                  meal={meal}
                  isEditing={isEditing}
                  onEdit={handleEditMeal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          </div>

          {/* Snacks Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Apple className="h-4 w-4" />
                <h3 className="font-medium text-sm">Snacks</h3>
              </div>
              <div className="text-xs text-muted-foreground">
                {calculateTotalMacros(mealPlan.snack).calories} kcal | P: {calculateTotalMacros(mealPlan.snack).protein}
                g | F: {calculateTotalMacros(mealPlan.snack).fat}g | C: {calculateTotalMacros(mealPlan.snack).carbs}g
              </div>
            </div>
            <div className="space-y-1">
              {mealPlan.snack.map((meal) => (
                <MealItem
                  key={meal.id}
                  meal={meal}
                  isEditing={isEditing}
                  onEdit={handleEditMeal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          </div>

          {/* Add Meal Button */}
          {isEditing && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Meal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Meal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meal-name">Meal Name</Label>
                    <Input
                      id="meal-name"
                      value={newMeal.name}
                      onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="meal-type">Meal Type</Label>
                    <Select
                      value={newMeal.type}
                      onValueChange={(value) => setNewMeal({ ...newMeal, type: value as Meal["type"] })}
                    >
                      <SelectTrigger id="meal-type">
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={newMeal.protein}
                        onChange={(e) => setNewMeal({ ...newMeal, protein: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={newMeal.fat}
                        onChange={(e) => setNewMeal({ ...newMeal, fat: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={newMeal.carbs}
                        onChange={(e) => setNewMeal({ ...newMeal, carbs: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="recipe-url">Recipe URL (optional)</Label>
                    <Input
                      id="recipe-url"
                      value={newMeal.recipeUrl || ""}
                      onChange={(e) => setNewMeal({ ...newMeal, recipeUrl: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <DialogClose asChild>
                    <Button onClick={handleAddMeal}>Add Meal</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Edit Meal Dialog */}
          {editingMeal && (
            <Dialog open={!!editingMeal} onOpenChange={(open) => !open && setEditingMeal(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Meal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-meal-name">Meal Name</Label>
                    <Input
                      id="edit-meal-name"
                      value={editingMeal.name}
                      onChange={(e) => setEditingMeal({ ...editingMeal, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-meal-type">Meal Type</Label>
                    <Select
                      value={editingMeal.type}
                      onValueChange={(value) => setEditingMeal({ ...editingMeal, type: value as Meal["type"] })}
                    >
                      <SelectTrigger id="edit-meal-type">
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-calories">Calories</Label>
                      <Input
                        id="edit-calories"
                        type="number"
                        value={editingMeal.calories}
                        onChange={(e) => setEditingMeal({ ...editingMeal, calories: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-protein">Protein (g)</Label>
                      <Input
                        id="edit-protein"
                        type="number"
                        value={editingMeal.protein}
                        onChange={(e) => setEditingMeal({ ...editingMeal, protein: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-fat">Fat (g)</Label>
                      <Input
                        id="edit-fat"
                        type="number"
                        value={editingMeal.fat}
                        onChange={(e) => setEditingMeal({ ...editingMeal, fat: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-carbs">Carbs (g)</Label>
                      <Input
                        id="edit-carbs"
                        type="number"
                        value={editingMeal.carbs}
                        onChange={(e) => setEditingMeal({ ...editingMeal, carbs: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-recipe-url">Recipe URL (optional)</Label>
                    <Input
                      id="edit-recipe-url"
                      value={editingMeal.recipeUrl || ""}
                      onChange={(e) => setEditingMeal({ ...editingMeal, recipeUrl: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingMeal(null)}>
                    Cancel
                  </Button>
                  <DialogClose asChild>
                    <Button onClick={handleUpdateMeal}>Save Changes</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface MealItemProps {
  meal: Meal
  isEditing: boolean
  onEdit: (meal: Meal) => void
  onDelete: (id: string, type: Meal["type"]) => void
}

function MealItem({ meal, isEditing, onEdit, onDelete }: MealItemProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-2 flex items-center justify-between",
        meal.recipeUrl && !isEditing && "cursor-pointer hover:bg-muted/50",
      )}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{meal.name}</h4>
          {isEditing ? (
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(meal)}>
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive"
                onClick={() => onDelete(meal.id, meal.type)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            meal.recipeUrl && <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {meal.calories} kcal | P: {meal.protein}g | F: {meal.fat}g | C: {meal.carbs}g
        </div>
      </div>
    </div>
  )
}
