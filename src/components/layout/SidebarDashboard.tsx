"use client"

import React from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, File, History, House, Scale } from "lucide-react";
import AppIcon from "../AppIcon";
import { Role } from "@/constant/role";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type SidebarItem = {
  name: string;
  href: string;
  role: Role[];
};

const mainSidebar: SidebarItem[] = [
  {
    name: "Home",
    href: "home",
    role: [Role.admin, Role.client, Role.lawyer],
  },
  {
    name: "Lawyer",
    href: "lawyer",
    role: [Role.client],
  },
  {
    name: "User",
    href: "user",
    role: [Role.admin],
  },
  {
    name: "Case",
    href: "case",
    role: [Role.admin, Role.client, Role.lawyer],
  },
  {
    name: "History",
    href: "history",
    role: [Role.client, Role.lawyer],
  },
];

const extractIcon = (name: string) => {
    if (name === "Home") return <House width={20} />;
    if (name === "Lawyer") return <Scale width={20} />;
    if (name === "User") return <CircleUserRound width={20} />;
    if (name === "Case") return <File width={20} />;
    if (name === "History") return <History width={20} />;
  };

const SidebarDashboard = () => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[3];
  const basePath = pathname?.split("/").slice(1, 3).join("/");
  const { data: session } = useSession();

  const role = session?.user?.role;

  if (!role) {
    return null; // If role is undefined, don't render the sidebar
  }

  return (
    <nav className="h-screen bg-white sticky top-0 left-0 py-6 border-r w-60 flex flex-col">
      <div className="px-6">
        <AppIcon />
      </div>

      <div className="flex flex-col pl-6 py-4 gap-4">
        {/* MAIN SIDEBAR */}
        <div className="flex flex-col gap-[2px] text-sm">
          {mainSidebar
          .filter((sidebar) => sidebar.role.includes(role))
          .map((sidebar) => (
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="mr-3">Logout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>
                Apakah kamu yakin ingin keluar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Tidak
                </Button>
              </DialogClose>
              <Button onClick={() => signOut({callbackUrl: '/'})} variant="default">
                Iya
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default SidebarDashboard;
