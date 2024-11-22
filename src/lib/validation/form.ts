import { z } from "zod";

export const registerFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["client", "lawyer"], { message: "Select a valid role" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
});