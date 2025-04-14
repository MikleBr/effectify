import { Button } from "@/components/ui/button";
import { Medicament, ScheduleType, useMedsStore } from "../lib/store";
import { cn } from "@/lib/utils";
import { DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { getGroupedByTimeMedicaments } from "../lib/getGroupedByTimeMedicaments";

export function MedsList() {
  const { meds } = useMedsStore();

  const todayMedicaments = meds.filter((medicament) => {
    if (medicament.schedule.type === ScheduleType.EVERYDAY) {
      return true;
    }

    return false;
  });

  const groupedByTimeMedicaments = getGroupedByTimeMedicaments(todayMedicaments);

  return (
    <>
      <DialogHeader>
        Medicamets
      </DialogHeader>
      <div className="space-y-4">
        {todayMedicaments.length !== 0 && Object.keys(groupedByTimeMedicaments).map((time) => {
          const timeMeds = groupedByTimeMedicaments[time];

          if (!timeMeds.length) return null;

          return (
            <div key={time} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {time}
              </h4>
              <div className="space-y-1">
                {timeMeds.map((medicament) => (
                  <MedItem key={medicament.id} medicament={medicament} />
                ))}
              </div>
            </div>
          );
        })}
        {meds.length === 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Нет добавленных лекарст
            <div className="mt-2">
              <Button size="sm" variant="outline">
                Добавить
              </Button>
            </div>
          </div>
        )}
        {meds.length !== 0 && <Button className="w-full">Добавить</Button>}
      </div>
    </>
  );
}

type MedItemProps = {
  medicament: Medicament;
}

function MedItem({ medicament }: MedItemProps){
  const [selected, setSelected] = useState(false);

  return  <button
    key={medicament.id}
    onClick={() => setSelected(prev =>!prev)}
    className="w-full flex items-center justify-between border rounded-lg px-3 py-2"
  >
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "w-6 h-6 flex items-center justify-center rounded-full",
          medicament.color,
        )}
      >
        💊
      </span>
      <span className="text-sm">{medicament.name}</span>
    </div>
    <div className={cn('rounded-full size-5 border-[1.5px] flex items-center justify-center transition-colors', selected && 'border-primary')}>
      <div className={cn('size-[11px] rounded-full bg-primary transition-all', {
        'scale-50 opacity-0': !selected,
        'scale-100 opacity-100': selected,
      })} />
    </div>
  </button>
}
