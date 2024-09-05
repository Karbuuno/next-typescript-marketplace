"use client";
import Link from "next/link";
import { MdOutlineEmail, MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import React, { useState } from "react";
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import axios from "axios";
import { API } from "@/lib/config";

const Navbar = () => {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { data, isError, isLoading } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  return (
    <div className='flex flex-col'>
      <div className='h-20 w-full border  border-b-gray-300 bg-white '>
        {/* BIGGER SCREENS */}
        <div className='flex items-center justify-between  gap-4 px-6 h-full mx-auto  '>
          {/* LEFT */}
          <div className=' flex items-center gap-24'>
            <Link href='/' className='flex items-center gap-3'>
              <div className='font-bold text-blue-900'>MARKETPLACE</div>
            </Link>

            {/* RIGHT */}
          </div>
          <div className='hidden lg:flex items-center justify-between gap-6 '>
            <SearchBar />
          </div>
          <div className='flex justify-between items-center '>
            <div className='flex justify-between items-center gap-4 px-4'>
              {session?.user ? (
                <div className='flex justify-between items-center gap-4 *: text-4xl *: cursor-pointer  '>
                  <MdOutlineEmail className='text-gray-400 ' />
                  <IoIosNotificationsOutline className='text-gray-400 ' />
                  <MdOutlineFavoriteBorder className='text-gray-400 ' />
                  <div className='relative'>
                    <Image
                      src={session?.user?.image as string}
                      width={40}
                      height={30}
                      alt={"avatar"}
                      className='rounded-full '
                      onClick={() => setIsProfileOpen(prev => !prev)}
                    />
                    {isProfileOpen && <Profile />}
                  </div>
                </div>
              ) : (
                <div className='h-10 flex items-center gap-2 bg-white shadow-md text-xl rounded-md border-teal-700 '>
                  <RegisterForm />
                  <span className='bg-gray-300 w-[2px] h-5'></span>
                  <LoginForm />
                </div>
              )}

              <button className='hidden lg:flex justify-center items-center h-10 w-[100px] bg-teal-700 text-lg text-white rounded-md'>
                Sell New
              </button>
              <Menu data={data} />
            </div>
          </div>
        </div>
      </div>
      <div className='h-20 w-full  border  border-b-gray-300 bg-white lg:hidden '>
        <div className='mx-16 mt-4 '>
          <SearchBar />
        </div>
        <div className='hidden lg:flex h-20 w-full border  border-b-gray-300 bg-white '>
          <div className='flex px-10  '>
            {data?.map(category => (
              <div
                key={category.id}
                className='flex items-center hover:bg-slate-100 px-6  '
              >
                <ul className='flex  cursor-pointer'>
                  <li className=' capitalize text-xl text-gray-500'>
                    {category?.name}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
