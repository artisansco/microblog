import { Hono } from "hono";
import { nanoid } from "nanoid";

const app = new Hono().basePath("/auth");

app.post("/token", async (c) => {
  const body = await c.req.json();

  return c.json({ data: { token: nanoid(), ...body } });
});

export default app;
