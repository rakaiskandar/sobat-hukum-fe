import { ColumnHeader } from "@/components/table/ColumnHeader";
import { DataTableRowActions } from "@/components/table/DataTableRowAction";
import { VerifyTableRowAction } from "@/components/table/VerifyTableRowAction";
import TypeBadge from "@/components/TypeBadge";
import { Role } from "@/constant/role";
import { ColumnDef } from "@tanstack/react-table";

export type CaseCol = {
    case_id: string;
    client_id: string;
    created_by: string;
    lawyer_id: string;
    user_id: string;
    title: string;
    case_type: string;
    description: string;
    status: "approved" | "reject";
    is_anonymous: Boolean;
  };

  export const columns: ColumnDef<CaseCol>[] = [
    {
        accessorKey: "case_id",
        header: ({ column }) => (
            <ColumnHeader column={column} title="Id" className="hidden" />
          ),
          cell: ({ row }) => {
            const id: string = row.getValue("case_id");
            return <div className="hidden">{id}</div>;
          },
          enableSorting: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <ColumnHeader column={column} title="Judul" />
    },
    {
        accessorKey: "created_by",
        header: ({ column }) => <ColumnHeader column={column} title="Dibuat Oleh" />
    },
    {
        accessorKey: "case_type",
        header: "Tipe Kasus",
    },
    {
        accessorKey: "description",
        header: "Deskripsi",
    },
    {
        accessorKey: "is_anonymous",
        header: "Anonymous",
        cell: ({ row }) => {
            const isAnonymous = row.getValue("is_anonymous");
            const displayText = isAnonymous === true ? "Yes" : "No";
            const variants = isAnonymous === true ? "green" : "red";
            return <TypeBadge type={variants}>{displayText}</TypeBadge>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const role: "approved" | "reject" = row.getValue("status");
            const variants = role === "approved" ? "green" : "red";
            return <TypeBadge type={variants}>{role}</TypeBadge>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />
    }

  ];