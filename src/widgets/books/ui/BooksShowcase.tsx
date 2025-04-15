import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BookOpenText, MoreHorizontal, PlusIcon } from "lucide-react";
import { useBooksStore } from "../lib/useBooksStore";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { debounce } from "throttle-debounce";
import { TodayProgress } from "./TodayProgress";

type BooksShowcaseProps = {
  onCreateBook: () => void;
};

export function BooksShowcase({ onCreateBook }: BooksShowcaseProps) {
  const books = useBooksStore((s) => s.books);
  const updateTodayProgress = useBooksStore((s) => s.updateTodayProgress);
  const currentBookId = useBooksStore((s) => s.currentBookId);
  const update = useBooksStore((s) => s.updateBook);
  const markAsRead = useBooksStore((s) => s.markAsRead);
  const startReading = useBooksStore((s) => s.startReading);
  const rereadBook = useBooksStore((s) => s.rereadBook);
  const deleteBook = useBooksStore((s) => s.deleteBook);
  const setCurrentBook = useBooksStore((s) => s.setCurrentBook);

  const [input, setInput] = useState("");

  const current = books.find((b) => b.id === currentBookId);

  const grouped = {
    want: books.filter((b) => b.status === "want"),
    reading: books.filter((b) => b.status === "reading"),
    finished: books.filter((b) => b.status === "finished"),
  };

  const updateProgress = useCallback(
    debounce(500, (progress: number) => {
      updateTodayProgress(progress);
      // if (currentBookId){
      //   update(currentBookId, {
      //     currentPage: Number(current?.currentPage || 0) + progress
      //   })
      // }
    }),
    [update, current, updateTodayProgress],
  );

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
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Library</DialogTitle>
      </DialogHeader>

      {current && (
        <div className="space-x-2 flex justify-between items-center">
          <div className="grow max-w-1/2 bg-muted rounded-xl p-4 aspect-[0.88] flex flex-col justify-between items-center">
            <div>
              <div className="text-muted-foreground text-sm">Reading now</div>
              <h3 className="mt-2 font-semibold text-lg">{current.title}</h3>
              <p className="text-sm text-muted-foreground">{current.author}</p>
            </div>
            <div className="w-full">
              <div className="mt-4 flex items-center justify-between text-muted-foreground text-xs">
                <div>{current.currentPage}</div>
                <div>{current.totalPages}</div>
              </div>
              <Progress
                className="w-full mt-1"
                value={Math.round(
                  (current.currentPage * 100) / current.totalPages,
                )}
                max={current.totalPages}
              />
            </div>
          </div>
          <div className="grow flex flex-col items-center">
            <TodayProgress className="w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit">Track progress</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <Input
                    autoFocus
                    type="number"
                    min={1}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      updateProgress(Number(e.target.value));
                    }}
                    placeholder="PageCount"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      <Tabs defaultValue="reading">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="want">Want to read</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="finished">Read</TabsTrigger>
          </TabsList>
          <Button size="icon" onClick={onCreateBook}>
            <PlusIcon />
          </Button>
        </div>

        {Object.entries(grouped).map(([key, group]) => (
          <TabsContent key={key} value={key}>
            {group.length === 0 && (
              <div className="text-muted-foreground text-sm py-4">No books</div>
            )}
            {group.length !== 0 && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {group.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => {
                      if (book.status === "reading") {
                        setCurrentBook(book.id);
                      }
                    }}
                    className={cn(
                      "relative p-3 border rounded-xl bg-background flex justify-between items-start",
                      {
                        "border-primary": book.id === currentBookId,
                      },
                    )}
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
                          <DropdownMenuItem
                            onClick={() => startReading(book.id)}
                          >
                            Start Reading
                          </DropdownMenuItem>
                        )}
                        {book.status === "finished" && (
                          <DropdownMenuItem onClick={() => rereadBook(book.id)}>
                            Read again
                          </DropdownMenuItem>
                        )}
                        {book.status === "reading" && (
                          <DropdownMenuItem onClick={() => markAsRead(book.id)}>
                            Book is read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => deleteBook(book.id)}
                        >
                          Delete
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
    </>
  );
}
