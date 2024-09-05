"use client";
import React from "react";
import { allCategories } from "@/lib/apiData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/lib/config";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CategoryList = () => {
  const router = useRouter();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  console.log(data);

  return (
    <main className='flex  flex-col gap-4 p-2 lg:gap-6 lg:p-6'>
      {isLoading ? (
        <Loader2 className='text-2xl items-center' />
      ) : isError ? (
        <h1>Data Not Found</h1>
      ) : (
        <>
          <div className='flex items-center'>
            <Button
              className='text-sm  md:text-xl'
              onClick={() => router.push("/dashboard/admin/category/new")}
            >
              Create Category
            </Button>
          </div>
          <div
            className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
            x-chunk='dashboard-02-chunk-1'
          >
            <DataTable columns={columns} data={data} />
            <div className='flex flex-col items-center gap-1 text-center'></div>
          </div>
        </>
      )}
    </main>
  );
};

export default CategoryList;
