"use client";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push("/"); // Redirect to homepage or any other route
  };

  return (
    <div className='flex flex-col pt-16 items-center bg-gray-100'>
      <div className='bg-white p-10 rounded-lg shadow-lg max-w-md text-center'>
        <CircleCheckBig className='w-16 h-16 text-green-500 mx-auto' />
        <h1 className='text-3xl font-bold mt-4'>Payment Successful!</h1>
        <p className='mt-2 text-gray-600'>Thank you for your purchase.</p>

        <div className='mt-6'>
          <p className='text-gray-800 font-semibold'>Order Number:</p>
          <p className='text-gray-500'>#123456789</p>{" "}
          {/* Replace with actual order number */}
        </div>

        <div className='mt-8'>
          <button
            onClick={handleHomeRedirect}
            className='bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition'
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
