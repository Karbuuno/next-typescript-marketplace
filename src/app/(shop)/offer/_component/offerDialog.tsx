"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@prisma/client";
import axios from "axios";
import { API } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const OfferDialog = ({ productInfo }: { productInfo: Product }) => {
  const [offerPrice, setOfferPrice] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const newOffer = {
    productId: productInfo?.id,
    buyerId: session?.user.id,
    price: parseFloat(offerPrice),
  };
  const handleOffer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/user/offer`, { newOffer });
      console.log(data);
      toast.success(`offer Successfully created`);
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full text-xl bg-white px-8 border border-teal-500 text-teal-700 capitalize py-7 hover:bg-gray-100'>
          make an offer
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] h-[450px]'>
        <form onSubmit={handleOffer}>
          <DialogHeader>
            <DialogTitle className='flex justify-center border-b-2 border-gray-100 py-4'>
              Make an Offer
            </DialogTitle>

            <div className='flex gap-4 py-8'>
              <img src={productInfo.thumbnail} alt='' className='w-20 h-20' />

              <div className='flex flex-col'>
                <h1 className='font-bold'>{productInfo.name}</h1>
                <p className='text-gray-500 '>£{productInfo.price}</p>
              </div>
            </div>
          </DialogHeader>

          <div className='flex flex-col '>
            <Label htmlFor='name' className='text-left mb-3 text-gray-500'>
              Offer your price
            </Label>
            <Input
              id='number'
              type='number'
              value={offerPrice}
              placeholder={`£${productInfo.price.toFixed(2)}`}
              className='col-span-3'
              onChange={e => setOfferPrice(e.target.value)}
            />
          </div>

          <DialogFooter className='mt-6'>
            <Button
              type='submit'
              className='text-xl text-white bg-teal-600  capitalize py-7 hover:bg-teal-700 w-full '
            >
              make an offer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;
