"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { Category } from "@prisma/client";
import {
  Baby,
  Cable,
  ChevronRight,
  Clapperboard,
  House,
  Shirt,
} from "lucide-react";
import { GiLargeDress } from "react-icons/gi";
import { ItemText } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Menu = ({ data }: { data?: Category[] }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const router = useRouter();
  const routes = [
    {
      id: 1,
      icon: GiLargeDress,
      name: "Products",
    },
    {
      id: 2,
      icon: Shirt,
      name: "Category",
    },
    {
      id: 3,
      icon: Baby,
      name: "Subcategory",
    },
    {
      id: 4,
      icon: House,
      name: "Users",
    },
    {
      id: 5,
      icon: Cable,
      name: "Orders",
    },
    {
      id: 5,
      icon: Clapperboard,
      name: "Orders",
    },
  ];

  return (
    <div className='lg:hidden'>
      {!open ? (
        <RxHamburgerMenu
          className='text-4xl cursor-pointer text-gray-500'
          onClick={() => setOpen(prev => !prev)}
        />
      ) : (
        <AiOutlineClose
          onClick={() => setOpen(prev => !prev)}
          className='text-4xl cursor-pointer text-gray-500'
        />
      )}

      {open && (
        <div className='absolute bg-white text-black left-0 mt-7  w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-2xl  z-10'>
          <div className=' flex flex-col bg-white   overflow-x-auto w-full rounded-md absolute top-0'>
            <div className='flex flex-col space-y-4 justify-between border-b border-gray-300 p-6'>
              <Button
                className='lg:hidden flex justify-center items-center h-auto w-full bg-teal-700 text-xl text-white rounded-md hover:bg-teal-600'
                onClick={() => router.push("/dashboard/user/products/new")}
              >
                Sell New
              </Button>
              <h1 className='text-teal-700 text-2xl text-center'>
                Best Marketplace
              </h1>
            </div>
            <div>
              <p className='px-7 text-gray-400 text-lg mt-4'>Categories</p>
              {data?.map(category => (
                <div
                  key={category.id}
                  className='flex justify-between border-b border-gray-300 p-6'
                >
                  <div className='flex text-2xl gap-2'>
                    <GiLargeDress className='text-teal-600 text-4xl' />{" "}
                    <span className='text-gray-500'>{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
