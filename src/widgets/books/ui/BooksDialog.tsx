import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { BooksShowcase } from "./BooksShowcase";
import { useState } from "react";
import { CreateBook } from "./CreateBook";

type BooksDialogView = "showcase" | "create-book";

export function BooksDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [activeView, setActiveView] = useState<BooksDialogView>("showcase");


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {activeView === "showcase" && <BooksShowcase onCreateBook={() => setActiveView("create-book")} />}
        {activeView === 'create-book' && <CreateBook goToMainScreen={() => setActiveView("showcase")}  />}
      </DialogContent>
    </Dialog>
  )
}
