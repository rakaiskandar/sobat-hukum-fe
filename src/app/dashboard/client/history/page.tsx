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
  const [clientId, setClientId] = useState<string | null>(null); // State untuk menyimpan client_id
  const [error, setError] = useState<string | null>(null); // State untuk error message

  // Mengambil client_id dari API saat komponen pertama kali dimuat
  const getClientDetails = async () => {
    try {
      setError(null); // Reset error sebelum request baru
      const res = await axios.get("http://127.0.0.1:8000/api/v1/users/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`, // Menggunakan token dari session
        },
      });

      const fetchedClientId = res.data.client_id; // Misalnya client_id ada di dalam response
      setClientId(fetchedClientId); // Menyimpan client_id ke dalam state
    } catch (err: any) {
      console.error("Error fetching client details:", err);
      setError(err?.response?.data?.message || "Failed to fetch client details");
      setLoading(false); // Pastikan loading diubah menjadi false jika terjadi error
    }
  };

  // Fetch data kasus setelah client_id berhasil diperoleh
  const getCase = async () => {
    try {
      setError(null); // Reset error sebelum request baru

      const res = await axios.get(`http://127.0.0.1:8000/api/v1/cases/history/${clientId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`, // Menggunakan token dari session
        },
      });

      setCaseData(res.data); // Menyimpan data kasus dari API
    } catch (err: any) {
      console.error("Error fetching case data:", err);
      setError(err?.response?.data?.message || "Failed to fetch case data");
    } finally {
      setLoading(false); // Pastikan loading selalu diubah menjadi false setelah selesai
    }
  };

  // Menjalankan kedua fungsi secara berurutan setelah komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      await getClientDetails();
    };
    fetchData();
  }, []); // Menjalankan hanya sekali ketika komponen dimuat

  useEffect(() => {
    if (clientId) {
      getCase(); // Menjalankan getCase setelah clientId tersedia
    }
  }, [clientId]); // Efek ini dijalankan setiap kali clientId berubah

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
      <h2 className="text-2xl font-semibold text-primary mb-3">
        Riwayat Kasus
      </h2>
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
                  <div>{dayjs(caseItem.created_at).format("dddd, D MMMM YYYY") || "---"}</div> {/* Menampilkan value Created At */}
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
