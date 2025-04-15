import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookDashedIcon, BookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooksStore } from "./lib/useBooksStore";
import { useState } from "react";
import { BooksDialog } from "./ui/BooksDialog";
import { cn } from "@/lib/utils";

interface BooksWidgetProps {
  className?: string;
}

export function BooksWidget({ className }: BooksWidgetProps) {
  const currentBookId = useBooksStore((s) => s.currentBookId);
  const books = useBooksStore((s) => s.books);
  const current = books.find((b) => b.id === currentBookId);
  const [open, setOpen] = useState(false);

  const booksListEmpty = books.length === 0

  return (
    <>
      <Card className={cn("relative cursor-pointer", className)}>
        <div className="absolute inset-0" onClick={() => setOpen(true)} />
        <CardContent className={booksListEmpty ? 'h-full flex justify-center items-center' : undefined}>
          {books.length === 0 && <div className="text-center space-y-2">
            <div className="mx-auto size-14 rounded-lg flex items-center justify-center bg-muted">
                <BookDashedIcon className="mx-auto size-10 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No books added
            </p>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Open Library
            </Button>
          </div>}
          {books.length !== 0 && !current && <div className="text-center space-y-2">
            <div className="mx-auto size-14 rounded-lg flex items-center justify-center bg-muted">
                <BookDashedIcon className="mx-auto size-10 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              You don't read the book
            </p>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Start Reading
            </Button>
          </div>}
          {current && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="size-20 rounded-lg flex items-center justify-center bg-muted">
                  <BookIcon className="size-8 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xs line-clamp-1">{current.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {current.author}
                </p>
              </div>
              <Progress
                value={(current.currentPage / current.totalPages) * 100}
                className="h-1.5"
              />
            </div>
          )}
        </CardContent>
      </Card>
      <BooksDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
