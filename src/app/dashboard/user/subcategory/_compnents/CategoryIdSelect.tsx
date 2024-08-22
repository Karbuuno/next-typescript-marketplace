"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller } from "react-hook-form";
import { FormItem, FormLabel } from "@/components/ui/form";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/config";
import { Category } from "@prisma/client";

interface CategoryIdSelect {
  control: Control<any>;
}

const CategoryIdSelect = ({ control }: CategoryIdSelect) => {
  //   const [categories, setCategories] = useState<Category[]>([]);
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  console.log(categories);
  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const { data } = await axios.get(`${API}/admin/category`);
  //         setCategories(data);
  //       } catch (err) {
  //         console.error("something went wrong", err);
  //       }
  //     };
  //     fetchCategories();
  //   }, []);

  return (
    <Controller
      control={control}
      name='categoryId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Choose Category</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder='Choose category' />
            </SelectTrigger>
            <SelectContent>
              {categories?.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CategoryIdSelect;
