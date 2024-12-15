"use client";

import { DataTable } from "@/components/table/DataTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Case() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<any[]>([]); // Default to an empty array
    const [error, setError] = useState<string | null>(null);

    const getCase = async () => {
        try {
        setError(null); // Reset error before fetching

        const res = await axios.get("http://localhost:8000/api/v1/cases/all/", {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
            },
        });

        setUserData(res.data); // Assuming the response contains an array of users
        } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err?.response?.data?.message || "Failed to fetch case data");
        } 
    };

    useEffect(() => {
        getCase();
      }, []);
      
    return (
        <div className="mx-3">
            <h2 className="text-2xl font-semibold text-primary">Kasus</h2>
            <DataTable
                columns={columns}
                data={userData}
                filterColumn="title"
                id="case_id"
            />
            {error && (
            <div className="text-red-500 mt-4">
                <p>{error}</p>
            </div>
        )}
        </div>
    )
};
