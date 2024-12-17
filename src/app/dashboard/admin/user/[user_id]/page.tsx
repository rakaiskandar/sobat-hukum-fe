"use client";

import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { media } from "@/constant/api";
import { useSession } from "next-auth/react";

export default function UserDetail() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // Ambil user_id dari URL
  const userId = pathname?.split("/").pop();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // API Lama: Ambil semua user
        const allUsersResponse = await axios.get(`http://localhost:8000/api/v1/users/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });

        const users = allUsersResponse.data;

        // Cari user berdasarkan user_id
        const matchedUser = users.find((user: any) => user.user_id === userId);

        if (!matchedUser) {
          setError("User tidak ditemukan.");
          return;
        }

        // API Baru: Ambil detail user spesifik
        const detailResponse = await axios.get(
          `http://localhost:8000/api/v1/users/${userId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        // Gabungkan data dari API lama dan API baru (detail user)
        setUserData({
          ...matchedUser,
          ...detailResponse.data, // Data baru dari API detail
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const profilePictureUrl = userData?.profile_picture
    ? `${media}${userData.profile_picture}`
    : "/astronaut.png";

  return (
    <div className="mx-3 bg-white rounded-lg p-12">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Detail Profil Pengguna
      </h2>
      <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mb-4">
        <Image
          src={profilePictureUrl}
          alt="Profile"
          className="w-full h-full object-cover"
          width={160}
          height={160}
          priority
        />
      </div>
      <Separator className="mb-4" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {/* Kondisional NIK hanya untuk client */}
        {userData?.role === "client" && (
          <div>
            <p className="font-medium text-gray-700">NIK:</p>
            <p>{userData?.client?.nik || "-"}</p>
          </div>
        )}

        {/* Lawyer-specific details */}
        {userData?.role === "lawyer" && (
          <>
            <div>
              <p className="font-medium text-gray-700">License Number:</p>
              <p>{userData?.lawyer?.license_number || "-"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Specialization:</p>
              <p>{userData?.lawyer?.specialization || "-"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Experience Years:</p>
              <p>{userData?.lawyer?.experience_years || "-"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Availability:</p>
              <p>{userData?.lawyer?.availability || "-"}</p>
            </div>
          </>
        )}

        {/* Informasi umum untuk semua role */}
        <div>
          <p className="font-medium text-gray-700">Username:</p>
          <p>{userData?.username || "-"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Full Name:</p>
          <p>{userData?.name || "-"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Email:</p>
          <p>{userData?.email || "-"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Phone Number:</p>
          <p>{userData?.phone_number || "-"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Age:</p>
          <p>{userData?.age || "-"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Gender:</p>
          <p>
            {userData?.gender === "L"
              ? "Laki-Laki"
              : userData?.gender === "P"
              ? "Perempuan"
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
