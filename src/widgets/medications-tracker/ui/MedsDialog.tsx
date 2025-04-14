import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import { MedsList } from "./MedsList"

const COLORS = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-purple-100"];

type MedsDialogProps = React.PropsWithChildren<{
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export function MedsDialog({
  dialogOpen,
  setDialogOpen,
  children,
}: MedsDialogProps) {
  const modalMode = 'list';

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        {modalMode === 'list' && <MedsList />}
        {/* {modalMode === 'form' && <AddMedsCard />}
        <DialogHeader>
          <DialogTitle>
            {modalMode === "form"
              ? "Добавить лекарство"
              : modalMode === "list"
              ? "Ваши лекарства"
              : "Прогресс за день"}
          </DialogTitle>
        </DialogHeader>

        {modalMode === "list" && (
          <>
            <div className="space-y-2">
              {meds.map((med) => (
                <div key={med.id} className="flex justify-between items-center px-3 py-2 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        med.color
                      )}
                    >
                      {med.icon}
                    </span>
                    <span className="text-sm">{med.name}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMed(med.id)}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => setModalMode('form')}>
              Добавить
            </Button>
          </>
        )}

        {modalMode === "overview" && (
          <div className="space-y-4">
            {["Общие", "Утро", "День", "Вечер"].map((time) => {
              const timeMeds = meds.filter((m) => m.time === time);

              if (!timeMeds.length) return null;

              return <div key={time} className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">{time}</h4>
                <div className="space-y-1">
                  {timeMeds
                    .map((med) => (
                      <div
                        key={med.id}
                        className="flex items-center gap-2 border rounded-lg px-3 py-2"
                      >
                        <span
                          className={cn(
                            "w-6 h-6 flex items-center justify-center rounded-full",
                            med.color
                          )}
                        >
                          {med.icon}
                        </span>
                        <span className="text-sm">{med.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            })}
            {meds.length === 0 && (
              <div className="text-sm text-muted-foreground text-center">
                Нет добавленных лекарст
                <div className="mt-2">
                  <Button size="sm" variant="outline" onClick={() => {
                    setModalMode("form")
                    setDialogOpen(true)
                  }}>Добавить</Button>
                </div>
              </div>
            )}
            {meds.length !== 0 && (
              <Button className="w-full" onClick={() => setModalMode('form')}>
                Добавить
              </Button>
            )}
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  )
}
