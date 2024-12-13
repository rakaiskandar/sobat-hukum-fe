"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";
import React, { useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

const HeaderDashboard = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const basePath = pathname?.split("/").slice(1, 3).join("/");

  const [formatDate, setFormatDate] = useState<string>("");
  const [greeting, setGreeting] = useState<{ emoji: string; greet: string }>({
    emoji: "",
    greet: "",
  });
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const getUserDetail = async () => {
    try {
      if (session?.user.role === "admin") return; // Admin doesn't need user details

      setLoadingDetails(true); // Start loading
      const role = session?.user.role === "client" ? "clients" : "lawyers";

      const res = await axios.get(
        `http://localhost:8000/api/v1/${role}/details/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingDetails(false); // End loading
    }
  };

  useEffect(() => {
    dayjs.locale("id");
    setFormatDate(dayjs().format("dddd, D MMMM YYYY"));

    const now = new Date().getHours();
    setGreeting(
      now >= 4 && now <= 11
        ? { emoji: "🌄", greet: "Selamat Pagi, " }
        : now >= 12 && now <= 14
        ? { emoji: "🌞", greet: "Selamat Siang, " }
        : now >= 15 && now <= 18
        ? { emoji: "🌆", greet: "Selamat Sore, " }
        : { emoji: "🌃", greet: "Selamat Malam, " }
    );

    getUserDetail();
  }, [session]);

  return (
    <>
      <nav className="p-4 h-[110px] border-b flex flex-col justify-between">
        <h4>{formatDate || "Loading date..."}</h4>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            <span className="text-3xl">{greeting.emoji}</span>
            {greeting.greet}
            <span>
              {session?.user.name || "Loading..."}
              {(session?.user.role === "admin" || session?.user.is_verified) && (
                <CheckCircle2 width={30} className="inline -mt-2 text-primary" />
              )}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <HeaderProfile img={session?.user?.profile || "/astronaut.png"} />
          </div>
        </div>
      </nav>
      {session?.user.role !== "admin" &&
        !session?.user.is_verified &&
        pathname !== `/${basePath}/verify` && (
          <div className="mx-3 mt-2">
            <Alert
              className="border-yellow-300 bg-yellow-50 text-yellow-700 p-4 rounded-md shadow-lg flex items-center"
              role="alert"
            >
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              {loadingDetails ? (
                <div>
                  <AlertTitle className="font-bold">Memuat...</AlertTitle>
                  <AlertDescription className="text-sm">
                    Memuat informasi verifikasi.
                  </AlertDescription>
                </div>
              ) : userDetails?.nik || userDetails?.license_number ? (
                <div>
                  <AlertDescription className="font-bold">Kamu belum terverifikasi</AlertDescription>
                  <AlertDescription className="text-sm">Tunggu verifikasi dari admin</AlertDescription>
                </div>
              ) : (
                <div>
                  <AlertTitle className="font-bold">Kamu belum terverifikasi</AlertTitle>
                  <AlertDescription className="text-sm">
                    Silakan verifikasi{" "}
                    <Link href={`/${basePath}/verify`} className="font-semibold text-blue-500 hover:text-blue-700">
                      disini
                    </Link>
                  </AlertDescription>
                </div>
              )}
            </Alert>
          </div>
        )}
    </>
  );
};

export default HeaderDashboard;
