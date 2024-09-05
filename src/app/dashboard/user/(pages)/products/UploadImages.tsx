"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

//interface
type ImageUploadProps = {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
};
const UploadImage: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className='flex flex-row gap-4'>
      <div className='mb-4 flex flex-wrap items-center gap-4'>
        {value?.map(url => (
          <div key={url} className='relative w-[200px] h-[200px]'>
            <div className='absolute top-0 right-0 z-10'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                size='sm'
                className='bg-red-1 text-white'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              src={url}
              alt='product image'
              className='object-cover rounded-lg'
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset='hyxd0din' onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              className='bg-gray-500 text-white text-xl'
              onClick={() => open()}
            >
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
