"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
export default function CaseApproveOpen() {
  const { data: session } = useSession();
  const [caseData, setCaseData] = useState<any[]>([]); // State untuk menyimpan array data kasus
  const [loading, setLoading] = useState<boolean>(true); // State loading
  const [error, setError] = useState<string | null>(null); // State untuk error message
  // Fetch data kasus dari API cases/assign
  const getCase = async () => {
    try {
      setError(null); // Reset error before fetching
      setLoading(true); // Set loading true saat mulai fetch

      const res = await axios.get("http://127.0.0.1:8000/api/v1/cases/open/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`, // Menggunakan token dari session
        },
      });

      console.log("API Response:", res.data); // Debugging respons

      if (Array.isArray(res.data)) {
        const filteredCases = res.data.filter(
          (caseItem: any) => caseItem.status !== "approved"
        );
        setCaseData(filteredCases);
      } else if (Array.isArray(res.data.results)) {
        const filteredCases = res.data.results.filter(
          (caseItem: any) => caseItem.status !== "approved"
        );
        setCaseData(filteredCases);
      } else {
      }
    } catch (err: any) {
      console.error("Error fetching case data:", err);
      setError(err?.response?.data?.message || "Failed to fetch case data");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk approve case
  const approveCase = async (caseId: string) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/cases/${caseId}/approve/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      // Update state setelah approve, menghapus case yang di-approve dari list
      setCaseData((prev) =>
        prev.filter((caseItem) => caseItem.case_id !== caseId)
      );
    } catch (err: any) {
      console.error("Error approving case:", err);
      setError(err?.response?.data?.message || "Failed to approve case");
    }
  };
  // Menjalankan fetch data saat komponen dimuat
  useEffect(() => {
    getCase();
  }, []); // Menjalankan hanya sekali ketika komponen dimuat
  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum tersedia
  }
  if (error) {
    return <div>{error}</div>; // Menampilkan pesan error jika ada kesalahan
  }
  // Menangani kondisi saat caseData kosong
  if (caseData.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold">Tidak ada kasus..</h2>
      </div> // Menampilkan pesan jika tidak ada kasus
    );
  }
  return (
    <div className="flex flex-col flex-wrap gap-4">
      <h2 className="text-2xl font-semibold text-primary mb-3">
        Laman Kasus Open Publik
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {caseData.map((caseItem, index) => (
            <Card key={index} className="w-[350px]">
            <CardHeader>
                <CardTitle>Case</CardTitle>
                <CardDescription>Details of the case.</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <div>{caseItem.title || "---"}</div>{" "}
                    {/* Menampilkan value Title */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`created_by-${index}`}>Created By</Label>
                    <div>
                        {caseItem.is_anonymous
                        ? "---"
                        : caseItem.created_by || "---"}
                    </div>{" "}
                    {/* Jika is_anonymous true, tampilkan --- */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`created_at-${index}`}>Created At</Label>
                    <div>
                        {dayjs(caseItem.created_at).format("dddd, D MMMM YYYY") ||
                        "---"}
                    </div>{" "}
                    {/* Menampilkan value Created At */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`case_type-${index}`}>Case Type</Label>
                    <div>{caseItem.case_type || "---"}</div>{" "}
                    {/* Menampilkan value Case Type */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <div>{caseItem.description || "---"}</div>{" "}
                    {/* Menampilkan value Description */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`is_anonymous-${index}`}>Is Anonymous</Label>
                    <div>{caseItem.is_anonymous ? "Yes" : "No"}</div>{" "}
                    {/* Menampilkan value Is Anonymous */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`status-${index}`}>Status</Label>
                    <div className="text-gray-600 font-bold">
                        {caseItem.status || "---"}
                    </div>
                    </div>
                    <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => approveCase(caseItem.case_id)}
                    >
                    Approve Case
                    </button>
                </div>
                </div>
            </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
