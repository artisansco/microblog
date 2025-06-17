import "dotenv/config";
import { z } from "zod";

// Zod schema for env validation
const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((val) => Number.parseInt(val || "5000"))
    .refine((val) => !isNaN(val), {
      message: "PORT must be a number",
    }),

  DATABASE_URL: z.string().min(1, "DB_FILENAME (DATABASE_URL) is required"),
});

// Parse and validate
const parsed = envSchema.safeParse({
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DB_FILENAME,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

// Export config
export const config = parsed.data;
