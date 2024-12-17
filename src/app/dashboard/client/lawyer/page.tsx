"use client"

import { baseUrl } from "@/constant/api";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OurLawyer() {
  const { data: session } = useSession();
  const [lawyer, setLawyer] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State loading
  const [error, setError] = useState<string | null>(null);

  const getLawyer = async () => {
    try {
      setError(null); // Reset error before fetching
      setLoading(true); // Set loading true saat mulai fetch

      const res = await axios.get(
        "http://127.0.0.1:8000/api/v1/lawyers/list/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      console.log("API Response:", res.data); // Debugging respons

      setLawyer(res.data);
    } catch (err: any) {
      console.error("Error fetching case data:", err);
      setError(err?.response?.data?.message || "Failed to fetch case data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLawyer();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum tersedia
  }

  if (error) {
    return <div>{error}</div>; // Menampilkan pesan error jika ada kesalahan
  }

  return (
    <div className="mx-3">
      <h2 className="text-2xl font-semibold text-primary mb-2">Pengacara Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
        {lawyer.map((l, index) => (
          <div
            className="bg-white border border-gray-200 p-4 rounded-lg flex items-center gap-4"
            key={index}
          >
            <Image
              src={`${baseUrl}${l?.profile_picture}`}
              alt="Lawyer 1"
              width={64}
              height={64}
              className="rounded-full w-20 h-20"
            />
            <div>
              <h3 className="text-xl font-bold">{l?.name}</h3>
              <p className="text-gray-700 mb-3">{l?.email}</p>
              <p className="text-sm text-gray-400">
                Spesialisasi {l?.specialization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
