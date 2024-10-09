// import React from "react";
// import { notFound } from "next/navigation";

// const OfferList = async ({ params }: { params: { id: string } }) => {
//   let offer;
//   try {
//     offer = await prisma?.offer.findUnique({
//       where: { id: params.id },
//     });

//     if (!offer) notFound();
//   } catch (err) {
//     notFound();
//   }
//   return <div></div>;
// };

// export default OfferList;
