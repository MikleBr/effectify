import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScheduleType } from "../lib/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createMedsSchema = z.object({
  name: z.string().min(2).max(100),
  dosage: z.string().min(2).max(100),
  frequency: z.nativeEnum(ScheduleType),
  times: z.string().min(1).max(100),
});

export function AddMedsCard() {
  const form = useForm({
    resolver: zodResolver(createMedsSchema),
    defaultValues: {
      frequency: ScheduleType.EVERYDAY,
    }
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Добавить лекарство</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Название лекарства" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dosage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Дизровка" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Плановый прием</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ScheduleType.EVERYDAY}>
                        Ежедневно
                      </SelectItem>
                      <SelectItem value={ScheduleType.PERIODIC}>
                        Раз в несколько дней
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="times"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Дизровка" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Добавить</Button>
        </form>
      </Form>
    </>
  );
}
