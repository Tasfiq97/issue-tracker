'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Spinner } from '@/app/components'
const DeleteIssueButton = ({issueId}:{issueId:number}) => {
    const [error,setError]=useState(false);
    const [isDelete,setIsDelete]=useState(false);
    const router=useRouter()
    const handleDelete= async() => {
        try {
         
            setIsDelete(true)
            await axios.delete(`/api/issues/${issueId}`);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setIsDelete(false)
            setError(true)
            
        }
    }
  return (
    <>    <AlertDialog.Root>
  <AlertDialog.Trigger>
  <Button color='red' disabled={isDelete}>Delete Issue  {isDelete &&<Spinner/>}</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content style={{ maxWidth: 450 }}>
    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
    <AlertDialog.Description size="2">
      Are you sure? This issue will no longer be accessible and cannot be undone
    </AlertDialog.Description>
    <Flex gap="3" mt="4">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button disabled={isDelete} onClick={handleDelete} variant="solid" color="red">
          Delete Issue
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>
<AlertDialog.Root open={error}>
<AlertDialog.Content>
<AlertDialog.Title>Error</AlertDialog.Title>
    <AlertDialog.Description size="2">
     this issue can not be deleted
    </AlertDialog.Description>
    <AlertDialog.Action>
        <Button onClick={()=>setError(false)} variant="soft" color="gray" mt="3">
          Ok
        </Button>
      </AlertDialog.Action>
</AlertDialog.Content>
</AlertDialog.Root>
</>

  )
}

export default DeleteIssueButton