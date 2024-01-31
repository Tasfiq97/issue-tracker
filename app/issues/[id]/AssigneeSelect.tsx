'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Skeleton} from "@/app/components"
import toast ,{Toaster} from "react-hot-toast"

const AssigneeSelect = ({issue}:{issue:Issue}) => {

   const {data:users,error,isLoading}= useUsers()

    if(isLoading)return<Skeleton/>

    if(error)return null;

    const assignedIssue=(userId:string)=>{
      const assignedToUserId = userId === 'unassigned' ? null : userId;
        axios.patch(`/api/issues/${issue.id}`,{assignedToUserId:assignedToUserId}).catch(()=>toast.error("changes could not be saved"))
    }
   
  return (
    <Select.Root
    defaultValue={issue.assignedToUserId||"unassigned"} 
     onValueChange={assignedIssue}>
    <Select.Trigger placeholder='Assign...' />
    <Select.Content>
      <Select.Group>
        <Select.Label>Suggestions</Select.Label>
        <Select.Item value="unassigned">Unassigned</Select.Item>
        { users?.map((user)=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)   }
  
      </Select.Group>
      
    </Select.Content>
    <Toaster/>
  </Select.Root>
  )
}


const useUsers=()=>useQuery<User[]>({
  queryKey:["users"],
  queryFn:()=>axios.get("/api/users").then(res=>res.data),
  staleTime:60*1000,
  retry:3,
})
export default AssigneeSelect