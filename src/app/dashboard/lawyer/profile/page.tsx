"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { baseUrl, media } from "@/constant/api";
import { getImageData } from "@/lib/utils";
import { lawyerProfileSchema } from "@/lib/validation/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Profile() {
  const { data: session } = useSession();
  const [preview, setPreview] = useState<any>("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof lawyerProfileSchema>>({
    resolver: zodResolver(lawyerProfileSchema),
    defaultValues: {
      license_number: "",
      experience_years: "",
      specialization: "",
      username: "",
      name: "",
      age: "",
      gender: "L",
      email: "",
      phone_number: "",
      profile_picture: "",
    },
  });

  const profilePictureUrl = session?.user?.profile_picture
      ? `${media}${session.user.profile_picture || userData?.profile_picture}`
      : "/astronaut.png";
    
  const onSubmit = async (values: z.infer<typeof lawyerProfileSchema>) => {
    setLoading(true);
    const toastId = toast.loading("Sedang Menyimpan Data...");

    try {
      const formData = new FormData();
      formData.append("license_number", values.license_number);
      formData.append("experience_years", values.experience_years);
      formData.append("specialization", values.specialization);
      formData.append("username", values.username);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone_number);
      formData.append("age", values.age);
      formData.append("gender", values.gender);

      // Append profile file if provided
      if (values.profile_picture?.[0]) {
        formData.append("profile_picture", values.profile_picture[0]);
      } else {
        // Ensure no profile_picture field is sent if not changed
        formData.delete("profile_picture");
    }

      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/update/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      
      if (res.status !== 200) {
        console.log("Error update");
        return;
      }

      toast.success("Berhasil Menyimpan Data", {
        id: toastId
      });

      window.location.href = '/dashboard'
    } catch (error) {
      console.log("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      if (!session?.user?.accessToken) {
        setError("No access token found.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/v1/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        const profileData = res.data;

        // Set default values dynamically after fetching data
        form.reset({
          license_number: profileData?.license_number || "",
          specialization: profileData?.specialization || "",
          experience_years: profileData?.experience_years.toString() || "",
          username: profileData?.username || "",
          name: profileData?.name || "",
          age: profileData?.age.toString() || "",
          gender: profileData?.gender || "",
          email: profileData?.email || "",
          phone_number: profileData?.phone_number || "",
          profile_picture: profileData?.profile_picture || undefined,
        });

        setUserData(profileData);
      } catch (error) {
        console.log("Failed to fetch data", error);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
    console.log(profilePictureUrl)
  }, [session, form]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mx-3 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-primary">Profil</h2>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border rounded-sm p-4 flex flex-col w-full gap-2 mt-2"
          >
            <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={preview || profilePictureUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                width={160}
                height={160}
                priority
              />
            </div>
            <div className="flex flex-col gap-2">
              <Separator />
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="profile_picture"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <FormItem>
                        <FormLabel>Profil</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...rest}
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreview(displayUrl || profilePictureUrl);
                              onChange(files || []);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Choose best image that bring spirits to your circle.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Username<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Full Name<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Email<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Phone Number<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Age<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Age"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Gender<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L">Laki - Laki</SelectItem>
                            <SelectItem value="P">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  disabled={loading}
                  control={form.control}
                  name="license_number"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        License Number<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="NIK"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Specialization<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Specialization"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="experience_years"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Experience Year<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Experience Years"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="mt-3" disabled={loading}>
              {loading ? "Saving..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
