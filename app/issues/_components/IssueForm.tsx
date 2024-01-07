"use client"
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
 import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { useForm,Controller } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {zodResolver} from "@hookform/resolvers/zod"
import { issueSchema } from '@/app/validationSchemas';
 import {z} from "zod";
import ErrorMessages from '@/app/components/ErrorMessages';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from "react-simplemde-editor"
  
type IssueFormData=z.infer<typeof issueSchema>


const IssueForm = ({issue}:{issue?:Issue}) => {
    const [error,setError]=useState("");
    const [isSubmitting,setIsSubmitting]=useState(false);
    const router=useRouter();
    const {register,control,handleSubmit,formState:{errors}}=useForm<IssueFormData>({
        resolver:zodResolver(issueSchema)
    });
    const handleFormData= async(data:object) => {
    try {
        setIsSubmitting(true)
        if(issue){
            await axios.patch('/api/issues/'+issue.id,data)
        }
        else{

            await axios.post("/api/issues",data);
        }
       router.push("/issues"); 
       router.refresh();
    } catch (error) {
        setIsSubmitting(false);
       setError("An error occurred");
        
    }
      
    }

  return (
   <div>
    {error && <Callout.Root className='max-w-xl mb-5' color='red'>
  <Callout.Text>
  {error}
  </Callout.Text>
</Callout.Root>}
     <form
     className='max-w-xl space-y-4'
     onSubmit={handleSubmit((data)=>handleFormData(data))}>
        <TextField.Root>
  <TextField.Input defaultValue={issue?.title} placeholder="Title"  {...register("title")}/>
</TextField.Root>
 <ErrorMessages>{errors.title?.message}</ErrorMessages>
<Controller
name='description'
control={control}
defaultValue={issue?.description}
render={({field})=> <SimpleMDE placeholder="Description" {...field} />}
/>
 <ErrorMessages>{errors.description?.message}</ErrorMessages>
<Button type='submit' disabled={isSubmitting}> {issue?"update Issue":"Submit new Issue"}   {isSubmitting&&<Spinner/>} </Button>
    </form>
   </div>
  )
}

export default IssueForm