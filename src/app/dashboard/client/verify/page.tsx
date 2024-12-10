"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clientSchema } from "@/lib/validation/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Verify() {
  const router = useRouter();

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: { 
      nik: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    try {
      const session = await getSession();

      const payload = {
        user_id: session?.user.id,
        nik: data.nik,
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/clients/create/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
  
      if (response.status != 201) {
        throw new Error(response.data.message || "Failed to update the data.");
      }

      toast.success("Data kamu telah berhasil ditambahkan! tunggu verifikasi dari admin");
      router.push(`/dashboard/${session?.user.role}/home`);
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("An error occurred during verification.");
    }
  };
  
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold text-primary">
        Verifikasi Identitas Kamu
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* Role-Specific Fields */}
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

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
