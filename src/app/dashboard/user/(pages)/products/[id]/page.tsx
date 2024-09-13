// import React from "react";
// import SubcategoryForm from "../_compnents/productsForm";
// import { notFound } from "next/navigation";

// const UpdateSubcategory = async ({ params }: { params: { id: string } }) => {
//   let subcategory;

//   try {
//     subcategory = await prisma?.subcategory.findUnique({
//       where: { id: params.id },
//     });

//     if (!subcategory) notFound();
//   } catch (err) {
//     notFound();
//   }

//   return (
//     <div>
//       <SubcategoryForm subcategory={subcategory} />
//     </div>
//   );
// };

// export default UpdateSubcategory;
