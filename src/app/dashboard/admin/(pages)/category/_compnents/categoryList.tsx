"use client";
import React from "react";
import { allCategories } from "@/lib/apiData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/lib/config";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../../columns";

const CategoryList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  console.log(data);

  return (
    <div className='flex justify-center w-full'>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Data Not Found</h1>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default CategoryList;
