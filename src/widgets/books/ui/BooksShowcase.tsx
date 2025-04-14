import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BookOpenText, MoreHorizontal, PlusIcon } from "lucide-react";
import { useBooksStore } from "../lib/useBooksStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BooksShowcaseProps = {
  onCreateBook: () => void;
};

export function BooksShowcase({ onCreateBook }: BooksShowcaseProps) {
  const books = useBooksStore((s) => s.books)
  const currentBookId = useBooksStore((s) => s.currentBookId)
  const update = useBooksStore((s) => s.updateBook)
  const markAsRead = useBooksStore((s) => s.markAsRead)
  const startReading = useBooksStore((s) => s.startReading)
  const rereadBook = useBooksStore((s) => s.rereadBook)
  const deleteBook = useBooksStore((s) => s.deleteBook)
  const setCurrentBook = useBooksStore((s) => s.setCurrentBook)

  const [input, setInput] = useState("")

  const current = books.find((b) => b.id === currentBookId)

  const grouped = {
    want: books.filter((b) => b.status === "want"),
    reading: books.filter((b) => b.status === "reading"),
    finished: books.filter((b) => b.status === "finished"),
  }

  const handleProgress = () => {
    if (!current) return
    const added = Number(input || 0)
    if (isNaN(added) || added <= 0) return

    const next = current.currentPage + added
    update(current.id, { currentPage: Math.min(next, current.totalPages) })
    setInput("")
    if (next >= current.totalPages) markAsRead(current.id)
  }

  if (books.length === 0) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Моя библиотека</DialogTitle>
        </DialogHeader>
        <div className="text-center text-muted-foreground space-y-2 mt-6">
          <BookOpenText className="mx-auto w-6 h-6" />
          <p>У вас пока нет книг</p>
          <Button onClick={onCreateBook}>Добавить книгу</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Моя библиотека</DialogTitle>
      </DialogHeader>

      {current && (
        <div className="bg-muted rounded-xl p-4 mb-4 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-base">{current.title}</h3>
              <p className="text-sm text-muted-foreground">{current.author}</p>
            </div>
            <div className="text-sm">
              {current.currentPage}/{current.totalPages}
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              autoFocus
              type="number"
              min={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="+ страниц"
            />
            <Button onClick={handleProgress}>Добавить</Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="reading" className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="want">Хочу прочитать</TabsTrigger>
          <TabsTrigger value="reading">В процессе</TabsTrigger>
          <TabsTrigger value="finished">Прочитано</TabsTrigger>
        </TabsList>

        {Object.entries(grouped).map(([key, group]) => (
          <TabsContent key={key} value={key}>
            {group.length === 0 ? (
              <div className="text-muted-foreground text-sm py-4">Нет книг</div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {group.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => {
                      if (book.status === 'reading') {
                        setCurrentBook(book.id);
                      }
                    }}
                    className={cn('relative p-3 border rounded-xl bg-background flex justify-between items-start', {
                      'border-primary': book.id === currentBookId,
                    })}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-sm leading-tight line-clamp-3">
                        {book.title}
                      </div>
                      <div className="text-xs text-muted-foreground mb-1 line-clamp-2">
                        {book.author}
                      </div>
                      {book.status === "reading" && (
                        <Progress
                          value={(book.currentPage / book.totalPages) * 100}
                          className="h-1 w-24"
                        />
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {book.status === "want" && (
                          <DropdownMenuItem onClick={() => startReading(book.id)}>
                            Начать читать
                          </DropdownMenuItem>
                        )}
                        {book.status === "finished" && (
                          <DropdownMenuItem onClick={() => rereadBook(book.id)}>
                            Перечитать
                          </DropdownMenuItem>
                        )}
                        {book.status === "reading" && (
                          <DropdownMenuItem onClick={() => markAsRead(book.id)}>
                            Прочитано
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => deleteBook(book.id)}>
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Button onClick={onCreateBook} className="mt-6">
        <PlusIcon className="mr-2" />
        Добавить книгу
      </Button>
    </>
  )
}
