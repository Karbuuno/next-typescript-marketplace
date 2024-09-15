"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { FcApproval } from "react-icons/fc";
import { RiShieldCheckFill } from "react-icons/ri";
import PaymentForm from "./paymentForm";

const ProductInfo = ({ productInfo }: { productInfo: Product }) => {
  const [selectedImage, setSelectedImage] = useState(productInfo?.thumbnail);

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <div className='lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8'>
        {/* Large display of the selected image */}
        <div className='col-span-1'>
          <img
            src={selectedImage}
            alt={productInfo.name}
            className='w-full object-cover h-full'
          />
        </div>

        {/* Thumbnail gallery */}
        <div className='grid grid-cols-2 grid-rows-2 gap-4 w-full'>
          {productInfo?.gallery.map((image, index, arr) => {
            return (
              <div
                key={index}
                className='col-span-1 row-span-1 w-full h-full relative className="relative flex  cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"'
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={productInfo.name}
                  className='w-full object-cover h-full'
                />

                <span
                  className={cn(
                    selectedImage === image
                      ? "ring-main-500"
                      : "ring-transparent",
                    "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                  )}
                  aria-hidden='true'
                />
              </div>
            );
          })}
        </div>
        <div className='bg-white flex flex-col px-4'>
          <div className=' mt-4 '>
            <h1 className='text-teal-700 text-xl font-semibold'>
              <span>£</span>
              {productInfo.price}
            </h1>
            <p className='flex text-teal-600'>
              Includes Buyer Protection{" "}
              <span>
                <FcApproval className='mt-1' />
              </span>
            </p>
            <div className='border-b-2 border-gray-200 mt-4' />
          </div>
          <div className='flex gap-10 *:text-gray-400 font-semibold uppercase mt-6 justify-start border-b-2 border-gray-100 py-3'>
            <div className=''>
              <div>Brand</div>
              <div> Size</div>
              <div> Condition</div>
              <div>Color</div>
              <div>Location</div>
            </div>
            <div className=''>
              <div>{productInfo.brand}</div>
              <div>{productInfo.size}</div>
              <div>{productInfo.condition}</div>
              <div>{productInfo.color}</div>
              <div>{productInfo.location}</div>
            </div>
          </div>
          <div className='flex flex-col mt-8 my-2 p-4 border-b-2 border-gray-100'>
            <div className='text-gray-400 text-xl'>
              Excellent condition, Like new, Super stretchy, Mens XL. White.
            </div>
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            <PaymentForm productInfo={productInfo} />
            <Button className='w-full text-xl bg-white px-8 border border-teal-500 text-teal-700 capitalize py-7 hover:bg-gray-100'>
              make an offer
            </Button>
            <Button className='w-full text-xl bg-white px-8 border border-teal-500 text-teal-700 capitalize py-7 hover:bg-gray-100'>
              ask seller
            </Button>
          </div>
          <div className='flex justify-between  gap-4 mt-4 py-4'>
            <div className=''>
              <RiShieldCheckFill className='text-teal-700 bg-white text-lg' />
            </div>

            <div className='flex flex-col'>
              <h1 className='text-lg'>Buyer Protection fee</h1>
              <p className='text-lg text-gray-400'>
                Our{" "}
                <Link href={"/"} className='text-teal-600 underline'>
                  Buyer Protection
                </Link>{" "}
                is added for a fee to every purchase made with the “Buy now”
                button. Buyer Protection includes our{" "}
                <Link href={"/"} className='text-teal-600 underline'>
                  Refund Policy.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
