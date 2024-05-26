import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.get("/test", (c) => {
  return c.json({
    message: "Test message!",
  });
});

app.route("/api/expenses", expensesRoute);

export default app;
