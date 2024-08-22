import React from "react";

import { notFound } from "next/navigation";
import CategoryForm from "../../category/_compnents/categoryForm";

const UpdateCategory = async ({ params }: { params: { id: string } }) => {
  let category;

  try {
    category = await prisma?.category.findUnique({
      where: { id: params.id },
    });

    if (!category) notFound();
  } catch (err) {
    notFound();
  }

  return (
    <div>
      <CategoryForm category={category} />
    </div>
  );
};

export default UpdateCategory;
