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

import { Loader2 } from "lucide-react";
import { subcategorySchema } from "@/validationSchema/subcategorySchema";
import SubcategoryIdSelect from "./CategoryIdSelect";
import { Subcategory } from "@prisma/client";

const SubcategoryForm = ({ subcategory }: { subcategory?: Subcategory }) => {
  // const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof subcategorySchema>>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      name: subcategory?.name,
    },
  });

  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["subcategory"],
  //   queryFn: () => axios.get(`${API}/admin/subcategory`).then(res => res.data),
  //   staleTime: 60 * 1000,
  //   retry: 3,
  // });
  // console.log(data);
  const queryClient = useQueryClient();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof subcategorySchema>) => {
    // setLoading(true);
    console.log(values);

    try {
      if (subcategory) {
        await axios.patch(`${API}/admin/subcategory/${subcategory.id}`, values);
      } else {
        await axios.post(`${API}/admin/subcategory`, values);
      }

      queryClient.invalidateQueries({ queryKey: ["subcategory"] });
      toast.success(
        `Successfully ${subcategory ? "updated" : "created"}  subcategory`
      );
      router.push("/dashboard/admin/subcategory");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className='max-w-xl mx-auto my-10'>
      <CardHeader>
        <h1 className='font-semibold text-teal-600'>
          {subcategory ? "Update Subcategory" : "Register Subcategory"}
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
                    <Input placeholder='Subcategory Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <SubcategoryIdSelect control={form.control} />
              )}
            />
            <SubmitButtonWithContent
              loading={form.formState.isSubmitting}
              isUpdate={!!subcategory}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubcategoryForm;

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
        Subcategory <Loader2 className='animate-spin h-5 w-5 text-white mx-2' />
      </Button>
    );
  }

  return (
    <Button type='submit'>
      {isUpdate ? "Update Subcategory" : "Register Subcategory"}
    </Button>
  );
};
