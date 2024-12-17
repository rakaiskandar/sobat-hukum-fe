"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios"; // Untuk menampilkan notifikasi
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  id: string; // Properti ID yang ingin digunakan (case_id/user_id)
}

export function DataTableRowActions<TData>({
  row,
  id,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const pathname = usePathname(); // Untuk notifikasi berhasil/gagal
  const { data: session } = useSession();

  const handleDelete = async () => {
    const itemId = row.getValue(id); // ID yang digunakan untuk delete
    const isCase = id === "case_id"; // Deteksi apakah ini case atau user
    const endpoint = isCase
      ? `http://localhost:8000/api/v1/cases/${itemId}/delete/`
      : `http://localhost:8000/api/v1/users/${itemId}/`;

    try {
      await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,  // Ganti dengan token Anda
        },
      });

      toast.success('Delete Success');

      window.location.href=`/dashboard/admin/case/` // Refresh halaman setelah delete berhasil
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error('Error');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => router.push(pathname! + "/" + row.getValue(id))}
        >
          Lihat Detail
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-500">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
