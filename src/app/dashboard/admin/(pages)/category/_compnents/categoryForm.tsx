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
import { categorySchema } from "@/validationSchema/categorySchema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { API } from "@/lib/config";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";

const CategoryForm = ({ category }: { category?: Category }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name,
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    setLoading(true);
    console.log(values);

    try {
      if (category) {
        await axios.patch(`${API}/admin/category/${category.id}`, values);
      } else {
        await axios.post(`${API}/admin/category`, values);
      }

      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success(
        `Successfully ${category ? "updated" : "created"}  category`
      );
      router.push("/dashboard/admin/category");
      setLoading(true);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Card className='max-w-xl mx-auto my-10'>
      <CardHeader>
        <h1 className='font-semibold text-teal-600'>
          {category ? "Update Category" : "Register Category"}
        </h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Category Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButtonWithContent
              loading={form.formState.isSubmitting}
              isUpdate={!!category}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;

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
        Category <Loader2 className='animate-spin h-5 w-5 text-white mx-2' />
      </Button>
    );
  }

  return (
    <Button type='submit'>
      {isUpdate ? "Update Category" : "Register Category"}
    </Button>
  );
};
