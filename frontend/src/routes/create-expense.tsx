import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  return (
    <div className="p-2">
      <h1>Create Expense</h1>
      <form className="max-w-xl m-auto">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="Amount" />
        <Button className="mt-4" type="submit">
          Create Expense
        </Button>
      </form>
    </div>
  );
}
