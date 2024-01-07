
 "use client"
 import dynamic from 'next/dynamic';
import LoadingIssueFormSkeleton from './loading';

 const IssueForm=dynamic(()=>import("@/app/issues/_components/IssueForm"),{ssr:false,loading:()=><LoadingIssueFormSkeleton/>})
  
const NewIssuePage = () => {
  
  return (
   <div>
   <IssueForm/>
   </div>
  )
}

export default NewIssuePage