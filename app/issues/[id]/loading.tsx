import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from "@/app/components"
import ReactMarkdown from 'react-markdown'
const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
    <Heading>
      <Skeleton />
    </Heading>
     <Flex gap="5" my="4">
    <Skeleton width="5rem"/>
    <Skeleton width="5rem"/>
    <Skeleton/>
     </Flex>
    <Card className="prose" mt="6">

    <Skeleton count={3}/>
    </Card>
</Box>
  )
}

export default LoadingIssueDetailPage