"use client"

import React from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, House } from "lucide-react";
import AppIcon from "../AppIcon";

const mainSidebar = [
  {
    name: "Home",
    href: "home",
    icon: "",
    role: ["admin", "client", "lawyer"],
  },
  {
    name: "Profile",
    href: "profile",
    icon: "",
    role: ["admin", "client", "lawyer"],
  },
];

const extractIcon = (name: string) => {
    if (name === "Home") return <House width={20} />;
    if (name === "Profile") return <CircleUserRound width={20} />;
  };

const SidebarDashboard = () => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[3];
  const basePath = pathname?.split("/").slice(1, 3).join("/");
  const { data: session } = useSession();

  return (
    <nav className="h-screen bg-white sticky top-0 left-0 py-6 border-r w-60 flex flex-col">
      <div className="px-6">
        <AppIcon />
      </div>

      <div className="flex flex-col pl-6 py-4 gap-4">
        {/* MAIN SIDEBAR */}
        <div className="flex flex-col gap-[2px] text-sm">
          {mainSidebar.map((sidebar) => (
            <Link
                key={sidebar.name}
                href={`/${basePath}/${sidebar.href}`}
                className={`flex items-center gap-3 mrt font-semibold p-3 hover:bg-blue-50 cursor-pointer rounded-bl rounded-tl ${
                    sidebar.href === currentPath
                    ? "text-blue-900 bg-blue-50"
                    : "bg-white text-gray-500"
                }`}
                >
                {extractIcon(sidebar.name)}
                {sidebar.name}
            </Link>
          ))}
        </div>

        <Button onClick={() => signOut({callbackUrl: '/'})} variant={"destructive"} className="mr-3">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default SidebarDashboard;
