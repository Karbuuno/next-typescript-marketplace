"use client";
import { API } from "@/lib/config";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { PiDressLight } from "react-icons/pi";
import Menu from "./Menu";
import CategoryLinks from "./categoryLinks";

export const HomPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { data, isError, isLoading } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  return (
    <>
      {/* <div className=' lg:hidden'>
        <Menu data={data} />
      </div> */}
    </>
  );
};
