import { notFound } from "next/navigation";

import prisma from "../../../../../prisma/prismaClient";
import ProductInfo from "./_component/productInfo";

const ProductInfoPage = async ({ params }: { params: { id: string } }) => {
  let productInfo = null;

  try {
    productInfo = await prisma?.product.findUnique({
      where: { id: params.id },
    })!;
    console.log(productInfo);
  } catch (error) {
    console.log("error at product info page:", error);
    productInfo = null;
    return notFound();
  }

  return (
    <div className='bg-gray-100 h-full'>
      <ProductInfo productInfo={productInfo!} />
    </div>
  );
};

export default ProductInfoPage;
