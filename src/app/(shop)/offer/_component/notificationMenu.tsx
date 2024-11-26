import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationDropDown from "./notificationDropDown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/lib/config";
import { Offer } from "@prisma/client";
import { Loader2 } from "lucide-react";

// Define the type for Offer
interface OfferData extends Offer {
  name: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: string;
}

const NotificationMenu = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const {
    data: offers,
    isError,
    isLoading,
  } = useQuery<OfferData[]>({
    queryKey: ["offer"],
    queryFn: () => axios.get(`${API}/user/offer`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  console.log(offers);
  return (
    <>
      <div className=' absolute flex justify-center bottom-5 bg-red-600 right-24 w-6 h-6  rounded-full'>
        <p className='text-lg text-white '>1</p>
      </div>
      <IoIosNotificationsOutline
        className='text-gray-400 '
        onClick={() => setIsNotificationOpen(prev => !prev)}
      />

      {isNotificationOpen && (
        <div className='absolute top-12 right-1  z-10'>
          <div className='w-96 h-96 bg-gray-100   shadow-md p-4'>
            {isLoading ? (
              <Loader2 className='text-2xl items-center animate-spin' />
            ) : isError ? (
              <h1>Data Not Found</h1>
            ) : (
              <>
                {/* Notification dropdown arrow */}
                <span className='bg-gray-100 w-8 h-4 rotate-45 top-0 right-24 absolute '></span>
                <div className='flex flex-col justify-start items-start text-lg mt-2'>
                  {offers?.map(offer => (
                    <NotificationDropDown offer={offer} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationMenu;
