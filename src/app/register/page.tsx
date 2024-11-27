"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerFormSchema } from "@/lib/validation/form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function Register() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: "client",
      password: "",
      phoneNumber: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      // Prepare payload based on backend expectations
      const payload = {
        name: values.name,
        username: values.username,
        email: values.email,
        role: values.role,
        password: values.password,
        phone_number: values.phoneNumber, // Adjusted key to match backend naming convention
      };
  
      console.log("Sending payload:", payload); // Debugging step
  
      // Register the user
      const res = await axios.post("http://localhost:8000/api/v1/register/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 201) {
        // Automatically sign in the user
        const loginRes = await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false, // Avoid auto-redirect to control routing manually
        });
  
        if (!loginRes?.ok) {
          console.error("Login failed:", loginRes?.error);
        } 
      }
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
    }
  };  

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block lg:inset-0">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12 overflow-y-auto h-screen">
        <div className="flex flex-col w-[400px] gap-6">
          <div className="flex flex-col pt-32 gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your data below to register to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Your Given Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" type="email" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your phone number" type="text" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="lawyer">Lawyer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your password" type="password" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
