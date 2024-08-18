"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogBox } from "@/components/ui/AlertDialogBox ";
export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<Category>[] = [
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
      const categoryInfo = row.original;

      const router = useRouter();

      return (
        <div className='space-x-4 ml-6'>
          <Button
            className='bg-gray-300 hover:bg-gray-500'
            onClick={() =>
              router.push(`/dashboard/admin/category/${categoryInfo.id}`)
            }
          >
            Update
          </Button>
          <AlertDialogBox id={categoryInfo.id} schema='category' />
        </div>
      );
    },
  },
];
