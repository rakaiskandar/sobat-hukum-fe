"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

export default function CaseHistory() {
  const { data: session } = useSession();
  const [caseData, setCaseData] = useState<any[]>([]); // State untuk menyimpan array data kasus
  const [loading, setLoading] = useState<boolean>(true); // State loading
  const [error, setError] = useState<string | null>(null); // State untuk error message

  // Fetch data kasus dari API assign
  const getCaseHistory = async () => {
    try {
      setError(null); // Reset error sebelum memulai fetching

      const res = await axios.get("http://127.0.0.1:8000/api/v1/cases/assign/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`, // Menggunakan token dari session
        },
      });

      setCaseData(res.data); // Menyimpan data kasus dari API
      setLoading(false); // Mengubah loading menjadi false setelah data didapat
    } catch (err: any) {
      console.error("Error fetching case history:", err);
      setError(err?.response?.data?.message || "Failed to fetch case history");
      setLoading(false);
    }
  };

  // Menjalankan fungsi fetch setelah komponen dimuat
  useEffect(() => {
    getCaseHistory(); // Memanggil API untuk mendapatkan data kasus
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum tersedia
  }

  if (error) {
    return <div>{error}</div>; // Menampilkan pesan error jika ada kesalahan
  }

  if (caseData.length === 0) {
    return <div>No data available.</div>; // Menampilkan pesan jika tidak ada data
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
                  <div>{caseItem.title || "---"}</div> {/* Menampilkan value Title */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`created_by-${index}`}>Created By</Label>
                  <div>{caseItem.created_by || "---"}</div> {/* Menampilkan value Created By */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`created_at-${index}`}>Created At</Label>
                  <div>{dayjs(caseItem.created_at).format("dddd, D MMMM YYYY") || "---"}</div> {/* Format tanggal */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`case_type-${index}`}>Case Type</Label>
                  <div>{caseItem.case_type || "---"}</div> {/* Menampilkan value Case Type */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <div>{caseItem.description || "---"}</div> {/* Menampilkan value Description */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`is_anonymous-${index}`}>Is Anonymous</Label>
                  <div>{caseItem.is_anonymous ? "Yes" : "No"}</div> {/* Menampilkan value Is Anonymous */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`status-${index}`}>Status</Label>
                  <div
                    className={
                      caseItem.status === "approved"
                        ? "text-green-600 font-bold" // Warna hijau untuk approved
                        : caseItem.status === "reject"
                        ? "text-red-600 font-bold" // Warna merah untuk reject
                        : "text-gray-600 font-bold" // Warna abu-abu untuk status null atau lainnya
                    }
                  >
                    {caseItem.status || "---"}
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
