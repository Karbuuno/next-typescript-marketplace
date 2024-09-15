import { Button } from "@/components/ui/button";
import { API } from "@/lib/config";
import { Product } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentForm = ({ productInfo }: { productInfo: Product }) => {
  const router = useRouter();
  const items = [
    {
      id: productInfo.id,
      name: productInfo?.name,
      price: Math.round(productInfo?.price),
      brand: productInfo?.brand,
      size: productInfo?.size,
      condition: productInfo?.condition,
      color: productInfo?.color,
      location: productInfo?.location,
      image: productInfo?.thumbnail,
    },
  ];

  const handleStripeSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/user/session`, { items });
      console.log(data);
      router.push(data.url);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <form onSubmit={handleStripeSession} className='flex flex-col gap-4 mt-4'>
      <Button
        type='submit'
        className='text-xl text-white bg-teal-600  capitalize py-7 hover:bg-teal-700 '
      >
        Buy New
      </Button>
    </form>
  );
};

export default PaymentForm;
