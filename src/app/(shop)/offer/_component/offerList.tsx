// import React from "react";

// import { API } from "@/lib/config";
// import { Offer } from "@prisma/client";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import NotificationMenu from "./notificationMenu";
// import { Loader2 } from "lucide-react";

// const OfferList = () => {
//   const router = useRouter();
//   const { data, isError, isLoading } = useQuery({
//     queryKey: ["offer"],
//     queryFn: () => axios.get(`${API}/user/offer`).then(res => res.data),
//     staleTime: 60 * 1000,
//     retry: 3,
//   });
//   console.log(data, isError);

//   return (
//     <div>
//       {isLoading ? (
//         <Loader2 className='text-2xl items-center' />
//       ) : isError ? (
//         <h1>Data Not Found</h1>
//       ) : (
//         <div>
//           <NotificationMenu data={data} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfferList;
