import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {MedsDialog} from "./MedsDialog"
import { cn } from "@/lib/utils"
import { PillIcon, PlusIcon } from "lucide-react"
import { ScheduleType, useMedsStore } from "../lib/store"
import { getGroupedByTimeMedicaments } from "../lib/getGroupedByTimeMedicaments"

type MedsTrackerWidgetProps = {
  className?: string
}

export function MedsTrackerWidget({ className }: MedsTrackerWidgetProps ) {
  const { meds } = useMedsStore()
  const [dialogOpen, setDialogOpen] = useState(false)

  const todayMedicaments = meds.filter((medicament) => {
    if (medicament.schedule.type === ScheduleType.EVERYDAY) {
      return true;
    }

    return false;
  });

  const groupedByTimeMedicaments = getGroupedByTimeMedicaments(todayMedicaments);


  return (
    <MedsDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
    >
      <Card className={cn('aspect-square w-full pb-0 gap-3', className)}>
        {meds.length !== 0 && <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle>Meds</CardTitle>
        </CardHeader>}
        <CardContent className="overflow-y-auto hide-scrollbar pb-6">
          {todayMedicaments.length !== 0 && Object.keys(groupedByTimeMedicaments).map((time) => {
            const timeMeds = groupedByTimeMedicaments[time];

            if (!timeMeds.length) return null;

            return (
              <div key={time} className="space-y-1 rounded-lg p-2 bg-primary/20 mb-2 last:mb-0">
                <h4 className="text-sm font-medium text-primary flex items-center justify-between">
                  {time}
                  <PlusIcon className="size-3" />
                </h4>
                <div className="">
                  {timeMeds.map((medicament) => (
                    <div key={medicament.id} className="text-sm">
                      {medicament.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {meds.length === 0 && (
            <div className="text-sm text-center space-y-2">
              <div className="mx-auto size-14 rounded-lg flex items-center justify-center bg-muted">
                  <PillIcon className="mx-auto size-8 text-muted-foreground" />
              </div>
              <div className="text-muted-foreground ">No meds added</div>
              <div className="mt-2">
                <Button size="sm" variant="outline" onClick={() => {
                  setDialogOpen(true)
                }}><PlusIcon /> Add Meds</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* <Button
        size="icon"
        variant="ghost"
        onClick={() => setModalMode("form")}
      >
        <Plus className="w-4 h-4" />
      </Button> */}
    </MedsDialog>

  )
}
