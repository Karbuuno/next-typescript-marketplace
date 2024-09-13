"use client";
import React, { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/config";
import { Category, Subcategory } from "@prisma/client";

interface CategoryIdSelect {
  control: Control<any>;
}

interface CategoryWithSubCategories extends Category {
  subCategory: Subcategory[];
  // Optionally include other fields if needed
}

const CategoryIdSelect = ({ control }: CategoryIdSelect) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
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
  // console.log(categories);

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
                  {category.name.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />

    // <div className=' flex justify-between items-center bg-white h-10 border border-gray-100 w-full rounded-md relative'>
    //   <h1>Category</h1>
    //   <div className='flex justify-between items-center'>
    //     <div>{isCategoryOpen && <SelectCategory />}</div>
    //     <ChevronDown
    //       onClick={() => setIsCategoryOpen(prev => !prev)}
    //       className={cn(
    //         "text-gray-500 text-2xl",
    //         isCategoryOpen && "rotate-180"
    //       )}
    //     />
    //   </div>
    // </div>
  );
};

export default CategoryIdSelect;

export const SubcategoryIdSelect = ({ control }: CategoryIdSelect) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  //   const [categories, setCategories] = useState<Category[]>([]);
  const {
    data: subcategory,
    isError,
    isLoading,
  } = useQuery<Subcategory[]>({
    queryKey: ["subcategory"],
    queryFn: () => axios.get(`${API}/admin/subcategory`).then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  return (
    <Controller
      control={control}
      name='subcategoryId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Choose Subcategory</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder='Choose Subcategory' />
            </SelectTrigger>
            <SelectContent>
              {subcategory?.map(subcategory => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
