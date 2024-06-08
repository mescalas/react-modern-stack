import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { api } from "@/lib/api.ts";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

const createExpenseSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  amount: z.number().positive({
    message: "Amount must be a positive number",
  }),
});

function CreateExpense() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createExpenseSchema>>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createExpenseSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await api.expenses.$post({ json: values });
    if (!res.ok) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    toast({
      variant: "default",
      title: "Expense created!",
      description: "Your expense has been successfully created.",
    });
    await navigate({ to: "/expenses" });
  }

  return (
    <div className="p-2">
      <h1>Create Expense</h1>
      <Form {...form}>
        <form
          className="max-w-xl m-auto space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="New title for your expense" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    placeholder="Choose an amount for your expense"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
