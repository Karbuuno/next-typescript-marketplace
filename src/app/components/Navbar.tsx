import Link from "next/link";
import { MdOutlineEmail, MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

// import NavIcons from "./NavIcons";

// const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });
const user = false;

const Navbar = () => {
  return (
    <div className='h-20 w-full  border-b-cyan-700 bg-gray-200 '>
      {/* MOBILE */}
      <div className='h-full flex items-center justify-between sm:hidden'>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className='hidden md:flex items-center justify-between  space-x-8 h-full container mx-auto  '>
        {/* LEFT */}
        <div className=' flex items-center gap-24'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='font-bold text-blue-900'>MARKETPLACE</div>
          </Link>

          {/* RIGHT */}
          <div className='flex items-center justify-between gap-16'>
            <SearchBar />
          </div>
        </div>
        <div className='flex justify-between items-center gap-16 mx-auto'>
          <div className='flex gap-4 *: text-4xl '>
            {user ? (
              <div className='flex gap-4 *: text-4xl '>
                <MdOutlineEmail className='text-gray-400 ' />
                <IoIosNotificationsOutline className='text-gray-400 ' />
                <MdOutlineFavoriteBorder className='text-gray-400 ' />
                <div className='w-8 h-8 rounded-full ring-1 bg-purple-900 text-white text-center text-lg'>
                  A
                </div>
              </div>
            ) : (
              <div className='h-10 flex items-center gap-2 bg-white shadow-md text-xl rounded-md border-teal-700 '>
                <button className=' text-teal-700 text-center  w-[100px]'>
                  Sing Up
                </button>
                <span className='bg-gray-300 w-[2px] h-5'></span>
                <button className='text-teal-700 text-center  w-[100px]'>
                  Log In
                </button>
              </div>
            )}

            <button className='h-10 w-[100px] bg-teal-700 text-lg text-white rounded-md'>
              Sell New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
