import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(1000),
  amount: z.number().int().positive(),
});

const createPostSchema = expenseSchema.omit({ id: true });
type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Rent",
    amount: 1000,
  },
  {
    id: 2,
    title: "Groceries",
    amount: 200,
  },
  {
    id: 3,
    title: "Gas",
    amount: 50,
  },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });

    c.status(201);

    return c.json(expense);
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce((acc, e) => acc + e.amount, 0);

    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({ expense: deletedExpense });
  });
