import { serve } from "@hono/node-server";

import app from "./src/app.js";
import { config } from "./src/config/config.js";



serve({ fetch: app.fetch, port: config.PORT! }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
