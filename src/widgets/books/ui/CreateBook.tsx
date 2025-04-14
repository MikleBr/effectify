import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBooksStore } from "../lib/useBooksStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

type CreateBookProps = {
  goToMainScreen?: () => void;
};

const createBookSchema = z.object({
  title: z.string().min(2).max(100),
  author: z.string().min(2).max(100),
  totalPages: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
    }),
  status: z.enum(["want", "reading", "finished"]),
});

type CreateBookFormData = z.infer<typeof createBookSchema>;

export function CreateBook({ goToMainScreen }: CreateBookProps) {
  const form = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      status: "want",
    },
  });
  const addBook = useBooksStore((s) => s.addBook);

  const onSubmit = (createBookData: CreateBookFormData) => {
    addBook({
      totalPages: parseInt(createBookData.totalPages, 10),
      author: createBookData.author,
      title: createBookData.title,
      status: createBookData.status,
    });
    goToMainScreen?.();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Button onClick={goToMainScreen} size="icon" variant="ghost">
            <ChevronLeft />
          </Button>
          Добавить книгу
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Название" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Автор" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="totalPages"
              render={({ field }) => (
                <FormItem className="grow shrink-0">
                  <FormControl>
                    <Input placeholder="Количество страниц" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grow shrink-0">
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="want">Хочу прочитать</SelectItem>
                        <SelectItem value="reading">Читаю</SelectItem>
                        <SelectItem value="finished">Прочитаноо</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Добавить</Button>
        </form>
      </Form>
    </>
  );
}
