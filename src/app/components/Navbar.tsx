"use client";
import Link from "next/link";
import { MdOutlineEmail, MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

const Navbar = ({ session }: { session: Session }) => {
  return (
    <div className='h-20 w-full  border-b-cyan-700 bg-gray-200 '>
      {/* BIGGER SCREENS */}
      <div className='flex items-center justify-between  gap-4 px-6 h-full mx-auto  '>
        {/* LEFT */}
        <div className=' flex items-center gap-24'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='font-bold text-blue-900'>MARKETPLACE</div>
          </Link>

          {/* RIGHT */}
        </div>
        <div className='flex justify-between items-center '>
          <div className='hidden lg:flex items-center justify-between gap-6 '>
            <SearchBar />
          </div>
          <div className='flex justify-between items-center gap-4 px-4'>
            {session?.user ? (
              <div className='flex justify-between items-center gap-4 *: text-4xl '>
                <MdOutlineEmail className='text-gray-400 ' />
                <IoIosNotificationsOutline className='text-gray-400 ' />
                <MdOutlineFavoriteBorder className='text-gray-400 ' />
                <Image
                  src={session?.user?.image}
                  atl='avatar'
                  width={40}
                  height={30}
                  className='rounded-full'
                />
              </div>
            ) : (
              <div className='h-10 flex items-center gap-2 bg-white shadow-md text-xl rounded-md border-teal-700 '>
                <button className=' text-teal-700 text-center  w-[100px]'>
                  Sing Up
                </button>
                <span className='bg-gray-300 w-[2px] h-5'></span>
                <button
                  className='text-teal-700 text-center  w-[100px]'
                  onClick={() => signIn("google")}
                >
                  Log In
                </button>
              </div>
            )}

            <button className='h-10 w-[100px] bg-teal-700 text-lg text-white rounded-md'>
              Sell New
            </button>
          </div>
          <div className=' lg:hidden'>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
