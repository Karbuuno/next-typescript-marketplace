"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { API } from "@/lib/config";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Loader2, Trash, Upload } from "lucide-react";
import { Product, Session } from "@prisma/client";
import { productSchema } from "@/validationSchema/productSchema";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import CategoryIdSelect from "./categoryIdSelect";
import { useDropzone } from "react-dropzone";
import { SubcategoryIdSelect } from "./categoryIdSelect";
import { useSession } from "next-auth/react";
interface FileWithPreview extends File {
  preview: string;
}
interface sessionData {
  id: string;
  name: string;
  image: string;
  email: string;
  role: string;
}

const ProductForm = ({ product }: { product?: Product }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { data: session } = useSession();
  console.log(session);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      // sellerId: session?.user.id,
      name: product?.name,
      color: product?.color,
      brand: product?.brand,
      size: product?.size,
      condition: product?.condition,
      location: product?.location,
      categoryId: product?.categoryId,
      subcategoryId: product?.subcategoryId,
      thumbnail: product?.thumbnail,
      gallery: product?.gallery,
      price: product?.price,
      description: product?.name,
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as any,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = error => reject(error);
    });
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    console.log("values", values, "files", files);

    try {
      const formData = new FormData();

      Object.keys(values).forEach(key => {
        if (key !== "gallery") {
          const value = values[key as keyof typeof values];
          if (value !== undefined) {
            formData.append(key, value.toString());
          }
        }
      });

      for (const file of files) {
        const base64 = await toBase64(file);
        formData.append("newImages", base64);
      }

      // console.log("form data", JSON.stringify(formData));

      // return;
      await axios.post(`${API}/user/products`, formData);

      queryClient.invalidateQueries({ queryKey: ["product"] });

      toast.success(`Successfully created`);
      // toast.success(`Successfully ${product ? "Updated" : "created"} product`);
      // router.push('/dashboard/admin/product')
    } catch (error) {
      console.log(error);
      toast.error("Unknown error please try again");
    }

    // try {
    //   if (product) {
    //     await axios.patch(`${API}/admin/product/${product.id}`, values);
    //   } else {
    //     await axios.post(`${API}/admin/product`, { values, imageUrl });
    //   }

    //   queryClient.invalidateQueries({ queryKey: ["product"] });
    //   toast.success(`Successfully ${product ? "updated" : "created"}  product`);
    //   router.push("/dashboard/admin/product");
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }
  };

  return (
    <Card className='max-w-4xl mx-auto my-10'>
      <CardHeader>
        <h1 className='font-semibold text-teal-600'>
          {product ? "Update Product" : "Register Product"}
        </h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 '>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Product Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder='Color' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder='Brand' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='size'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder='Size' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='condition'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Input placeholder='Condition' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='Location' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter product price'
                      {...field}
                      value={field.value}
                      onChange={e =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='bg-white'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <CategoryIdSelect control={form.control} />
              )}
            />
            <FormField
              control={form.control}
              name='subcategoryId'
              render={({ field }) => (
                <SubcategoryIdSelect control={form.control} />
              )}
            />
            <FormField
              control={form.control}
              name='gallery'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product gallery</FormLabel>
                  <FormControl>
                    <div {...getRootProps()} className='dropzone'>
                      {/* <input {...getInputProps} /> */}
                      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                        <div className='text-center'>
                          <Upload
                            {...getInputProps}
                            className='h-10 w-10 text-gray-900/25'
                          />
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-wrap mt-4'>
              {files.map((file, index) => (
                <div key={index} className='relative m-2'>
                  <img
                    alt={file.name}
                    src={file.preview}
                    className='w-24 h-24 object-cover rounded-md'
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                  >
                    <Trash className='text-white w-5 h-5' />
                  </button>
                </div>
              ))}
            </div>
            <SubmitButtonWithContent
              loading={form.formState.isSubmitting}
              isUpdate={!!product}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

// Loader Component
export const SubmitButtonWithContent = ({
  loading,
  isUpdate,
}: {
  loading: boolean;
  isUpdate: boolean;
}) => {
  if (loading) {
    return (
      <Button className='space-x-2 gap-x-1'>
        {isUpdate ? "Updating" : "Registering"}
        Product <Loader2 className='animate-spin h-5 w-5 text-white mx-2' />
      </Button>
    );
  }

  return (
    <Button type='submit'>
      {isUpdate ? "Update Product" : "Register Product"}
    </Button>
  );
};
