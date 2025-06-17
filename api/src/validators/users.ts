import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(2, "Please enter a fullname with more than 2 characters"),
  username: z.string().min(2, "Username must have atleast 2 characters"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

export const loginSchema = z.object({
  username: z.string().min(2, "Username must have at least 2 characters or more"),
  password: z.string().min(8, "Please provide a password with 8 characters or more"),
});
