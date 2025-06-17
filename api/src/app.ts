import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { trimTrailingSlash } from "hono/trailing-slash";
import authRouter from "./routes/auth.js";

const app = new Hono();

app.use(logger());
app.use(cors({ origin: "*" }));
app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(
  bodyLimit({
    maxSize: 1024 * 7, // 7 mb
    onError: (c) => c.json({ message: "request payload is too large!!" }, 413),
  }),
);

app.get("/", (c) => c.json({ message: "Hello Hono!" }));


//auth router
app.route("/api/v1", authRouter)

export default app;
