// "use client";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import React from "react";
// import { FcGoogle } from "react-icons/fc";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,

//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   email: z.string().email({ message: "Email is required" }),

//   password: z.string().min(4, {
//     message: "Password must be at least 4 characters.",
//   }),
// });

// const LoginPage = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }
//   return (
//     <>
//       <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
//         <Card className='w-[500px] mx-auto h-[500px] '>
//           <CardTitle className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
//             Login
//           </CardTitle>

//           <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className='space-y-8'
//               >
//                 <FormField
//                   control={form.control}
//                   name='email'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type='email'
//                           placeholder='Enter Your Email'
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name='password'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type='password'
//                           placeholder='Enter Your password'
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type='submit'>Submit</Button>
//               </form>
//             </Form>

//             <p className='mt-10 text-center text-sm text-gray-500'>
//               Not a member?{" "}
//               <Link
//                 href='#'
//                 className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
//               >
//                 Register New
//               </Link>
//             </p>
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default LoginPage;
