import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  age: z
    .string(),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }) // Added minimum length
    .max(12, { message: "Phone number must be at most 12 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["client", "lawyer"], { message: "Select a valid role" }),
  gender: z.enum(["L", "P"], { message: "Select a valid gender" }), // Added gender validation
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const clientSchema = z.object({
  nik: z
    .string()
    .length(16, { message: "NIK must be 16 digits" })
    .regex(/^\d+$/, { message: "NIK must contain only numbers" }),
});

export const lawyerSchema = z.object({
  license_number: z
    .string()
    .min(5, { message: "License number must be at least 5 characters" }),
  specialization: z
    .string()
    .min(3, { message: "Specialization must be at least 3 characters" }),
  experience_years: z
    .string()
    .min(1, { message: "Experience must be at least 1 year" }),
});