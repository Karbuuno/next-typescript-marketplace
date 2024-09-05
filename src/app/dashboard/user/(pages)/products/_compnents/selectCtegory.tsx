import { ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PiDressLight } from "react-icons/pi";

export const SelectCategory = () => {
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  return (
    <div className=' flex flex-col bg-white shadow-md max-h-60 overflow-x-auto w-[500px] rounded-md absolute right-3 top-10'>
      {/* <ArrowLeft /> */}

      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Women</span>
        </div>
        <ChevronRight
          className='text-lg text-gray-400'
          onClick={() => setIsSubcategoryOpen(prev => !prev)}
        />
        {isSubcategoryOpen && <SelectCategory />}
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Women</span>
        </div>
        <ChevronRight className='text-lg text-gray-400' />
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Women</span>
        </div>
        <ChevronRight className='text-lg text-gray-400' />
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Women</span>
        </div>
        <ChevronRight className='text-lg text-gray-400' />
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Women</span>
        </div>
        <ChevronRight className='text-lg text-gray-400' />
      </div>
    </div>
  );
};
export const SelectSubcategory = () => {
  return (
    <div className=' flex flex-col bg-white shadow-md max-h-60 overflow-x-auto w-[500px] rounded-md absolute right-6 top-10'>
      {/* <ArrowLeft /> */}

      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Clothing</span>
        </div>
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Clothing</span>
        </div>
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Clothing</span>
        </div>
      </div>
      <div className='flex justify-between border border-b-gray-100 p-3'>
        <div className='flex *:text-xl'>
          <PiDressLight className='text-teal-600  mt-1' /> <span>Clothing</span>
        </div>
      </div>
    </div>
  );
};
