"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clientSchema, lawyerSchema } from "@/lib/validation/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Verify() {
  const { data: session } = useSession();

  // Determine schema and form based on role
  const isClient = session?.user.role === "client";
  const schema = isClient ? clientSchema : lawyerSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: isClient
      ? { nik: "" }
      : { license_number: "", specialization: "", experience_years: 1, availability: "available" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    // Add API call or handling logic here
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold text-primary">
        Verifikasi Identitas Kamu ({isClient ? "Client" : "Lawyer"})
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* Role-Specific Fields */}
          {isClient ? (
            <FormField
              name="nik"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your NIK" type="text" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                name="license_number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your license number" type="text" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="specialization"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your specialization" type="text" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="experience_years"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Years</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter years of experience" type="number" min="1" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="availability"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
