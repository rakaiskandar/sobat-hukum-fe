"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function VerifyTableRowAction<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
    
  const { data: session } = useSession();
  const isVerified: boolean = row.getValue("is_verified");
  const userId: string = row.getValue("user_id");
  const role: "client" | "lawyer" = row.getValue("role");
  const name: string = row.getValue("name");

  const [stateVerified, setStateVerified] = useState<boolean>(isVerified);

  const handleVerify = async () => {
    try {
      if (!session?.user?.accessToken) {
        toast.error("User is not authenticated.");
        return;
      }

      const res = await axios.patch(
        `http://localhost:8000/api/v1/${role}s/verify/${userId}/`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`
          }
        }
      );

      if (res.status !== 200) {
        toast.error("Failed to verify user.");
        return;
      }

      setStateVerified(true);

      toast.success(`${name} verified successfully.`);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify client.");
    }
  };

  return (
    <div className="flex items-center">
      {stateVerified ? (
        <span className="p-2 text-green-500 font-semibold">Verified</span>
      ) : (
        <Button
          onClick={handleVerify}
          className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Verify
        </Button>
      )}
    </div>
  );
}
