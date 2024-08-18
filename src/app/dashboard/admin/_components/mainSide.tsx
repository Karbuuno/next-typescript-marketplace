import Link from "next/link";
import React from "react";
import CategoryList from "../(pages)/category/_compnents/categoryList";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";

const MainSide = () => {
  return (
    <main className='flex  flex-col gap-4 p-2 lg:gap-6 lg:p-6'>
      <div className='flex items-center'>
        <Button className='text-sm  md:text-xl'>Create Category</Button>
      </div>
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <CategoryList />
        <div className='flex flex-col items-center gap-1 text-center'></div>
      </div>
    </main>
  );
};

export default MainSide;
