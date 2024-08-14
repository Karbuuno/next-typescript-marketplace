"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email({ message: "Email is required" }),

  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const LoginForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await signIn("Credentials", {
        ...values,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/Dashboard");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className=' text-teal-700 text-center  w-[100px]'
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className=' text-teal-700 text-center  w-[100px]'>
            Login
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter Your Email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter Your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full bg-blue-500' type='submit'>
              Sign Up
            </Button>
          </form>
        </Form>
        <Button className='bg-gray-500' onClick={() => signIn("google")}>
          Sign in With Google
        </Button>
        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?{" "}
          <Link
            href='#'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Register New
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;