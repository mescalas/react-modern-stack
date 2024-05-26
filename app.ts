import { Hono } from 'hono'
const app = new Hono()

app.get('/test', c => {
 return c.json({
  "message": "Test message!",
 });
});


export default app