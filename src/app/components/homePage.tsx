"use client";
import { API } from "@/lib/config";
import { Category, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FcApproval } from "react-icons/fc";

const HomePage = () => {
  // const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: () => axios.get(`${API}/user/products`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  return (
    <div className='h-full'>
      <div className='flex w-full py-4 gap-4 '>
        <div className='w-full  relative'>
          <div className='absolute top-14 left-14'>
            <h1 className='text-xl'>NEW</h1>
            <h1 className='text-lg'>Discover Luxury Fashion</h1>
          </div>
          <Image
            src='https://nextjs-marketplace.s3.amazonaws.com/hero-image-left.jpg'
            alt='hero image'
            width={200}
            height={50}
            className='object-cover w-full h-96 rounded-md object-center'
          ></Image>
          <Button className='absolute text-lg bottom-10 left-6 bg-white text-gray-600'>
            Shop Now
          </Button>
        </div>
        <div className='w-full relative'>
          <div className='absolute top-14 left-14'>
            <h1 className='text-xl'>NEW</h1>
            <h1 className='text-lg'>Discover Luxury Fashion</h1>
          </div>
          <Image
            src='https://nextjs-marketplace.s3.amazonaws.com/hero-image2.jpg'
            alt='hero image'
            width={200}
            height={50}
            className=' object-cover w-full h-96 rounded-md object-center'
          ></Image>
          <Button className='absolute text-lg bottom-10 left-6 bg-teal-600 w-64 h-12  text-white capitalize'>
            browse designer items
          </Button>
        </div>
      </div>
      <h1 className='font-bold text-2xl mt-12'>Collection from seller</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto gap-4 *:mt-4 *:mb-4'>
        {products?.map(product => (
          <Link
            key={product.id}
            href={`product/${product.id}`}
            className='w-full flex flex-col gap-4  relative bg-white'
          >
            <div className='flex justify-center w-full h-80 relative'>
              <Image
                src={product?.thumbnail}
                alt='product thumbnail'
                width={200}
                height={50}
                className='object-cover h-80 w-full object-center'
              ></Image>
              <div className='flex gap-2 right-4 bottom-4 absolute bg-gray-100 rounded-3xl p-2'>
                <Heart className=' ' />
                <span>2</span>
              </div>
            </div>
            <div className='px-3 text-gray-400'>
              <div>{product.brand}</div>
              <div>{product.size}</div>
              <div>
                <span>£</span>
                {product.price}
              </div>
              <div className='flex'>
                <span>£</span>
                {(product.price * 1.1).toFixed(2)}{" "}
                <span className='px-1'>incl</span>
                <span>
                  <FcApproval />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* <Link href='/' className='w-full flex flex-col gap-4 relative bg-white'>
          <div className='flex justify-center w-full h-80 relative'>
            <Image
              src='https://nextjs-marketplace.s3.ap-south-1.amazonaws.com/download.jpeg'
              alt='product image'
              width={200}
              height={50}
              className='object-cover'
            ></Image>
            <div className='flex gap-2 right-4 bottom-4 absolute bg-gray-100 rounded-3xl p-2'>
              <Heart className=' ' />
              <span>2</span>
            </div>
          </div>
          <div className='px-3 text-gray-400'>
            <div>Next</div>
            <div>L</div>
            <div>
              <span>£</span>30.00
            </div>
            <div>
              <span>£</span>32.00 <span>incl</span>
            </div>
          </div>
        </Link>
        <Link
          href='/'
          className='w-full flex flex-col gap-4   relative bg-white'
        >
          <div className='flex justify-center w-full h-80 relative'>
            <Image
              src='https://nextjs-marketplace.s3.ap-south-1.amazonaws.com/download.jpeg'
              alt='product image'
              width={200}
              height={50}
              className='object-cover'
            ></Image>
            <div className='flex gap-2 right-4 bottom-4 absolute bg-gray-100 rounded-3xl p-2'>
              <Heart className=' ' />
              <span>2</span>
            </div>
          </div>
          <div className='px-3 text-gray-400'>
            <div>Next</div>
            <div>L</div>
            <div>
              <span>£</span>30.00
            </div>
            <div>
              <span>£</span>32.00 <span>incl</span>
            </div>
          </div>
        </Link>
        <Link
          href='/'
          className='w-full flex flex-col gap-4   relative bg-white'
        >
          <div className='flex justify-center w-full h-80 relative'>
            <Image
              src='https://nextjs-marketplace.s3.ap-south-1.amazonaws.com/download.jpeg'
              alt='product image'
              width={200}
              height={50}
              className='object-cover'
            ></Image>
            <div className='flex gap-2 right-4 bottom-4 absolute bg-gray-100 rounded-3xl p-2'>
              <Heart className=' ' />
              <span>2</span>
            </div>
          </div>
          <div className='px-3 text-gray-400'>
            <div>Next</div>
            <div>L</div>
            <div>
              <span>£</span>30.00
            </div>
            <div>
              <span>£</span>32.00 <span>incl</span>
            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
};
export default HomePage;
