"use client";

import { DataTable } from "@/components/table/DataTable";
import { columns } from "./columns";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function User() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any[]>([]); // Default to an empty array
  const [error, setError] = useState<string | null>(null);

  const getUser = useCallback(async () => {
    if (!session?.user?.accessToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      setError(null); // Reset error before fetching

      const res = await axios.get("http://localhost:8000/api/v1/users/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      setUserData(res.data); // Assuming the response contains an array of users
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err?.response?.data?.message || "Failed to fetch user data");
    } 
  }, [session?.user.accessToken]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="mx-3">
      <h2 className="text-2xl font-semibold text-primary mb-3">Pengguna</h2>
      <DataTable
        columns={columns}
        data={userData}
        filterColumn="name"
      />
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
