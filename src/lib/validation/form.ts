import { z } from "zod";

export const registerFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Your name must be at least 3 characters"}),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" }),
    phoneNumber: z
    .string()
    .max(12, { message: "Phone number must be at most 12 characters"}),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["client", "lawyer"], { message: "Select a valid role" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
});