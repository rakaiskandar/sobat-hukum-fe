"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
      <div className="flex items-center justify-center space-x-6">
        {/* Foto Profil */}
        <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src={session?.user?.profile || "/astronaut.png"}
            alt="Profile"
            className="w-full h-full object-cover"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Nama Pengguna</h1>
        <p className="text-gray-600">email@example.com</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Update Profile
        </button>
      </div>
    </div>
  );
}
