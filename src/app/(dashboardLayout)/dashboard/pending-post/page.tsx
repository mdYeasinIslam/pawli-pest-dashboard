'use client'
import LoadingSpinner from "@/app/loading";
import PostList from "@/components/post/PostList";
import ShowPendingPost from "@/components/post/ShowPendingPost";
import { Button } from "@/components/ui/button";
import {  useGetAllPostQuery, useGetPendingPostQuery } from "@/redux/services/Api/post/postApi";
import { AllPostData } from "@/Types/post";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const page=() =>{
  const { data,error,isLoading,refetch} = useGetPendingPostQuery() as {data:AllPostData[],error:unknown,isLoading:unknown,refetch:()=>void};
   const [allPost, setAllPost] = useState<AllPostData[] | []>()
   useEffect(() => {
    if(data){
      setAllPost(data)
      refetch()
    }
   }, [data,refetch]) 
   
  //  console.log(data)
  if (isLoading) return <div><LoadingSpinner/></div>
  if (error) return <div>An Error is occur</div>
  return (
    <>
      <div className="flex  max-w-6xl mx-auto items-center mt-6 mb-2">
        <Link href={'/dashboard'}>
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-medium">Pending Post</h1>
      </div>
      <PostList allPost={allPost} refetch={refetch}/>
      </>
  )
}

export default page
