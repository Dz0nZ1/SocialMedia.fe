"use client";

import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea'
import { useGetUser, useUpdateUser } from '@/hooks/UserHooks'
import { useSession } from 'next-auth/react'
import { useForm } from "react-hook-form"
import { EditProfileSchema } from '@/validators/UserValidator'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { UpdateUser } from '@/types/User'
import toast from 'react-hot-toast';

const EditProfile = () => {
    const {data : session} = useSession();
    const { data: user, error, isLoading, revalidateUser } = useGetUser(session?.user.id)
    const {revalidateUpdateUser} = useUpdateUser();


    const form = useForm<z.infer<typeof EditProfileSchema>>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues : {  
            firstName : user?.firstName,  
            lastName : user?.lastName,  
            username : user?.username,  
            bio: user?.bio,  
            phoneNumber: user?.phoneNumber,  
            location:  user?.location,  
            jobPosition :user?.jobPosition,  
        }
       
      })

      async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
        const userUpdate : UpdateUser = {
          user : {
            userId : session?.user?.id ?? "",  
            firstName : values.firstName,
            lastName : values.lastName,
            username : values.username,
            bio: values.bio,
            phoneNumber: values.phoneNumber,
            location: values.location,
            jobPosition: values.jobPosition
          }
        }
        
        await toast.promise(revalidateUpdateUser(userUpdate).then(() => revalidateUser()), 
        {
          loading: 'Loading...',
          success: 'Profile was updated successfully',
          error: 'There was an error while updating your profile',
        })

      }

  return (
    <>
        {user != undefined &&
        <>
     
    <Dialog>
      <DialogTrigger asChild>
      
       <Button className="bg-black active:bg-gray-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 xsm:text-black" variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w">
      <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <br />
          <DialogDescription className='text-center'>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <br />
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">  
              {/* <FormItem className="w-full"> */}
                <Label htmlFor="firstName" className="text-right mb-3">
                    First name
                </Label>
                <FormControl>
                <Input
                    id="firstName"
                    placeholder='Your name'
                    // defaultValue={user.firstName}
                    {...field}
                    className="col-span-3 mb-3"
                    />
                </FormControl>
              {/* </FormItem> */}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">  
              {/* <FormItem className="w-full"> */}
                <Label htmlFor="lastName" className="text-right mb-3">
                    Last name
                </Label>
                <FormControl>
                <Input
                     id="lastName"
                     placeholder='Your last name'
                    // defaultValue={user.lastName}
                    {...field}
                    className="col-span-3 mb-3"
                    />
                </FormControl>
              {/* </FormItem> */}
              </div>
            )}
          />
           <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">  
              {/* <FormItem className="w-full"> */}
                <Label htmlFor="username" className="text-right mb-3">
                    Username
                </Label>
                <FormControl>
                <Input
                     id="username"
                     placeholder='Your last name'
                    // defaultValue={user.username}
                    {...field}
                    className="col-span-3 mb-3"
                    />
                </FormControl>
              {/* </FormItem> */}
              </div>
            )}
          />
           <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">  
              {/* <FormItem className="w-full"> */}
                <Label htmlFor="phoneNumber" className="text-right mb-3">
                    Phone
                </Label>
                <FormControl>
                <Input
                     id="phoneNumber"
                     placeholder='Phone number'
                    // defaultValue={user.phoneNumber}
                    {...field}
                    className="col-span-3 mb-3"
                    />
                </FormControl>
              {/* </FormItem> */}
              </div>
            )}
          />
           <FormField
            control={form.control}
            name="jobPosition"
            render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">  
              {/* <FormItem className="w-full"> */}
                <Label htmlFor="jobPosition" className="text-right mb-3">
                    Job position
                </Label>
                <FormControl>
                <Input
                     id="jobPosition"
                     placeholder='Job position'
                    // defaultValue={user.jobPosition}
                    {...field}
                    className="col-span-3 mb-3"
                    />
                </FormControl>
              {/* </FormItem> */}
              </div>
            )}
          />
           <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">  
              {/* <FormItem className="w-full"> */}
                <Label htmlFor="location" className="text-right mb-3">
                    Location
                </Label>
                <FormControl>
                <Input
                     id="location"
                     placeholder='Job position'
                    // defaultValue={user.location}
                    {...field}
                    className="col-span-3 mb-3"
                    />
                </FormControl>
              {/* </FormItem> */}
              </div>
            )}
          />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  // defaultValue={user.bio}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
        </>
        }
    </>
  )
}

export default EditProfile