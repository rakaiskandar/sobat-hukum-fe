"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

export default function CaseHistory() {
  const { data: session } = useSession();
  const [caseData, setCaseData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fungsi untuk mengambil data case history
  const getCaseHistory = async () => {
    try {
      setError(null);

      const res = await axios.get("http://127.0.0.1:8000/api/v1/cases/assign/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      const approvedCases = Array.isArray(res.data)
        ? res.data.filter((caseItem: any) => caseItem.status === "approved")
        : [];

      setCaseData(approvedCases);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching case history:", err);
      setError(err?.response?.data?.message || "Failed to fetch case history");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCaseHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(caseData) || caseData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {caseData.map((caseItem, index) => (
        <Card key={index} className="w-[350px]">
          <CardHeader>
            <CardTitle>Case History</CardTitle>
            <CardDescription>Details of the case.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <div>{caseItem.title || "---"}</div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`created_by-${index}`}>Created By</Label>
                  <div>{caseItem.created_by || "---"}</div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`created_at-${index}`}>Created At</Label>
                  <div>{dayjs(caseItem.created_at).format("dddd, D MMMM YYYY") || "---"}</div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`case_type-${index}`}>Case Type</Label>
                  <div>{caseItem.case_type || "---"}</div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <div>{caseItem.description || "---"}</div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`status-${index}`}>Status</Label>
                  <div className="text-green-600 font-bold">
                    {caseItem.status || "---"}
                  </div>
                </div>
              </div>
              {/* Tombol Detail */}
              <Button
                className="mt-4"
                onClick={() => {
                  // Mengambil case_id dengan getValue jika tersedia, fallback ke caseItem.case_id
                  const caseId = caseItem.getValue ? caseItem.getValue("case_id") : caseItem.case_id;

                  if (caseId) {
                    console.log(`Navigating to /dashboard/lawyer/case/${caseId}`);
                    router.push(`/dashboard/lawyer/case/${caseId}`);
                  } else {
                    console.error("Case ID not found!");
                  }
                }}
              >
                Detail
              </Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
