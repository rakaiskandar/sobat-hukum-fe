"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";
import React, { useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderDashboard = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const basePath = pathname?.split("/").slice(1, 3).join("/");

  const [formatDate, setFormatDate] = useState<string>(""); // Moved to state
  const [greeting, setGreeting] = useState<{ emoji: string; greet: string }>({
    emoji: "",
    greet: "",
  });

  useEffect(() => {
    // Set locale for dayjs
    dayjs.locale("id");

    // Dynamically format date on the client
    setFormatDate(dayjs().format("dddd, D MMMM YYYY"));

    // Calculate greeting based on the current time
    const now = new Date().getHours();
    if (4 <= now && now <= 11) {
      setGreeting({
        emoji: "🌄",
        greet: "Selamat Pagi, ",
      });
    } else if (12 <= now && now <= 14) {
      setGreeting({
        emoji: "🌞",
        greet: "Selamat Siang, ",
      });
    } else if (15 <= now && now <= 18) {
      setGreeting({
        emoji: "🌆",
        greet: "Selamat Sore, ",
      });
    } else {
      setGreeting({
        emoji: "🌃",
        greet: "Selamat Malam, ",
      });
    }
  }, []);

  return (
    <>
      <nav className="p-4 h-[110px] border-b flex flex-col justify-between">
        <h4>{formatDate || "Loading date..."}</h4>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            {/* Greeting and session values are shown only after hydration */}
            <span className="text-3xl">{greeting.emoji}</span>
            {greeting.greet}
            <span>
              {session?.user.name ? session.user.name : "Loading..."}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <HeaderProfile
              img={
                session?.user.profile
                  ? session.user.profile
                  : "https://github.com/shadcn.png"
              }
            />
          </div>
        </div>
      </nav>
      {!session?.user.is_verified && pathname !== `/${basePath}/verify` ? (
        <div className="mx-3 mt-2">
          <Alert
            className="border-yellow-300 bg-yellow-50 text-yellow-700 p-4 rounded-md shadow-lg flex items-center"
            role="alert">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <div>
              <AlertTitle className="font-bold">Kamu belum terverifikasi</AlertTitle>
              <AlertDescription className="text-sm">
                Silakan verifikasi{" "}
                <Link href={`/${basePath}/verify`} className="font-semibold text-blue-500 hover:text-blue-700">
                  disini
                </Link>
              </AlertDescription>
            </div>
          </Alert>
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default HeaderDashboard;
