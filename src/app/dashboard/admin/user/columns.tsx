import { ColumnHeader } from "@/components/table/ColumnHeader";
import { DataTableRowActions } from "@/components/table/DataTableRowAction";
import { VerifyTableRowAction } from "@/components/table/VerifyTableRowAction";
import TypeBadge from "@/components/TypeBadge";
import { Role } from "@/constant/role";
import { ColumnDef } from "@tanstack/react-table";

export type UserCol = {
  user_id: string;
  name: string;
  username: string;
  phone_number: string;
  email: string;
  gender: "L" | "P";
  role: Role;
  is_verified: Boolean;
};

export const columns: ColumnDef<UserCol>[] = [
  {
    accessorKey: "user_id",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Id" className="hidden" />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("user_id");
      return <div className="hidden">{id}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Nama" />
  },
  {
    accessorKey: "username",
    header: ({ column }) => <ColumnHeader column={column} title="Username" />,
  },
  {
    accessorKey: "phone_number",
    header: "No. HP",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
    cell: ({ row }) => {
      const gender: "L" | "P" = row.getValue("gender");
      const variants = gender === "L" ? "blue" : "purple"
      return <TypeBadge type={variants}>{gender === "L" ? "Laki - Laki" : "Perempuan"}</TypeBadge>
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: "client" | "lawyer" = row.getValue("role");
      const variants = role === "client" ? "green" : "yellow";
      return <TypeBadge type={variants}>{role}</TypeBadge>
    },
  },
  {
    accessorKey: "is_verified",
    header: "Verifikasi",
    cell: ({ row }) => <VerifyTableRowAction row={row}/>
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} id="user_id"/>
  }
];
