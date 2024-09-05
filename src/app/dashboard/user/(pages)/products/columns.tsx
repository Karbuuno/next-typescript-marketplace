"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogBox } from "@/components/ui/AlertDialogBox ";
export type SubCategory = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className='text-right'>Created At</div>,
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("createdAt")).toDateString();
      return (
        <div className='ml-8 h-4 w-full text-right font-medium '>
          {formattedDate}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const subcategoryInfo = row.original;

      const router = useRouter();

      return (
        <div className='space-x-4 ml-6 '>
          <Button
            className='bg-gray-300 hover:bg-gray-500'
            onClick={() =>
              router.push(`/dashboard/admin/subcategory/${subcategoryInfo.id}`)
            }
          >
            Update
          </Button>
          <AlertDialogBox id={subcategoryInfo.id} schema='subcategory' />
        </div>
      );
    },
  },
];
