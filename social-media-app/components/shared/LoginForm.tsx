"use client"
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginFormSchema } from '@/validators/UserValidator'
import { loginFormDefaultValues } from '@/constants'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";

const LoginForm = () => {

  const initalValues = loginFormDefaultValues;
  const router = useRouter();

    // 1. Define your form.
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: initalValues
  })

  function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false
  }).then(r =>
    {
        router.push("/");
        toast(`Welcome back! ${values.username}`, {
            icon: '👋',
        });
    }
)
    console.log(values)
  }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 bg-white p-8 rounded-lg shadow-lg mx-7 md:mx-24 lg:mx-56 xl:mx-96 ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <div className="flex flex-col gap-5 items-center w-full max-w-md">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-700">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className=" hover:bg-stone-600 bg-stone-950 text-white font-bold mt-10 mb-10 w-1/4 py-2 px-3 rounded focus:outline-none focus:shadow-outline lg:w-1/5">
          Submit
        </Button>
      </form>
    </Form>
  );
  
}

export default LoginForm