"use client";

import React from 'react'
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
import { useSession } from 'next-auth/react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import toast from 'react-hot-toast';
import { CreatePostSchema } from '@/validators/PostValidator';
import { useCreatePost, useGetPost, useUpdatePost } from '@/hooks/PostHooks';
import { CreatePost, UpdatePost } from '@/types/Post';
import { HiOutlinePencil } from 'react-icons/hi2';
import { Textarea } from '../ui/textarea';
import { useGetUser } from '@/hooks/UserHooks';

type PostFormProps = {
    isUpdate : boolean
    selectedPostId : string,
}

const PostForm = ({isUpdate, selectedPostId} : PostFormProps) => {
    const {data : session} = useSession();

    const { data : user, revalidateUser } = useGetUser(session?.user.id);
    const { data : post, error, isLoading, revalidatePost } = useGetPost(selectedPostId);
    const {revalidateCreatePost} = useCreatePost();
    const {revalidateUpdatePost} = useUpdatePost();
  
    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: {
            content: isUpdate ? post?.content : "",
            imageUrl: isUpdate ? post?.imageUrl : ""
        }
       
      })

      async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
        const postUpdate : UpdatePost = {
          post : {
            postId : selectedPostId,
            content : values.content
          }
        }

        const createPost : CreatePost ={
            post: {
                userId : session?.user.id ?? "",
                content : values.content,
                imageUrl : values.imageUrl
            }
        }
        
       if(isUpdate) {
        await toast.promise(revalidateUpdatePost(postUpdate).then(() => revalidateUser()), 
        {
          loading: 'Loading...',
          success: 'Post was updated successfully',
          error: 'There was an error while updating your Post',
        })
       }else {
        await toast.promise(revalidateCreatePost(createPost).then(() => revalidateUser()), 
        {
          loading: 'Loading...',
          success: 'Post was created successfully',
          error: 'There was an error while creating your Post',
        })
       }
      }

  return (
    <>
     <Dialog>
       <DialogTrigger asChild>
        {isUpdate ? <HiOutlinePencil/> : <Button className="bg-black active:bg-gray-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 xsm:text-black" variant="outline">Create Post</Button>}
       </DialogTrigger>
       <DialogContent className="w-11/12 sm:max-w">
       <DialogHeader>
           <DialogTitle>{isUpdate ? "Edit" : "Create"} Post</DialogTitle>
           <DialogDescription className='text-center'>
            {isUpdate ? "Make changes to your post here. Click save when you're done." : "Create your new post here"}
           </DialogDescription>
         </DialogHeader>
         <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
       {isUpdate == false &&  
          <>
           <FormField
             control={form.control}
             name="imageUrl"
             render={({ field }) => (
                 <div className='flex flex-row items-center'>  
                 <Label htmlFor="imageUrl" className='mb-3 mr-3'>
                     Image
                 </Label>
                 <FormControl>
                 <Input
                     id="imageUrl"
                     placeholder='Paste your image url here'
                     {...field}
                     className="col-span-3 mb-3"
                     />
                 </FormControl>
               </div>
             )}
           />
          </>}
       <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  {...field}
                  placeholder="Write about your post..."
                />
              </FormControl>
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
  )
}

export default PostForm