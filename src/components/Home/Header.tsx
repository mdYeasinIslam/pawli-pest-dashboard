import LoadingSpinner from '@/app/loading'
import { useGetPendingPostQuery } from '@/redux/services/Api/post/postApi'
import { AllPostData } from '@/Types/post'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import { Skeleton } from '../ui/skeleton'

const Header = ({date}:{date?:string}) => {
  const {data,error,isLoading} = useGetPendingPostQuery() as {data:AllPostData[],error:unknown,isLoading:unknown,refetch:()=>void}
  const [showPostStatus,setShowPostStatus] = useState(false)
  // console.log(data)
  if(isLoading)  {
    return (
      <div className="space-y-2 ">
        <Skeleton className="h-4 w-full bg-slate-400" />
        <Skeleton className="h-4 w-full bg-slate-400" />
        {/* <div> <LoadingSpinner/></div> */}
      </div>
        )
  }

  if(error) {  
  return  <div>{error ? String(error) : 'An error occurred'}</div>
}
  return (
     <div className=" mx-auto  bg-black text-white px-6 py-3 flex items-center justify-between rounded-md ">
              <div className='w-[30%] mx-auto'>
                  {/* <Marquee className=''>
                   
                    <p className='text-sm font-medium pl-80'> First Post :{data[0]?.scheduledDate ? new Date(data[0].scheduledDate).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: undefined,
                      hour12: true,
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).replace(',', ',') : ''}</p>
                    <p className=" text-sm font-medium pl-80">Second Post : {data[2]?.scheduledDate ? new Date(data[2].scheduledDate as string).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: undefined,
                      hour12: true,
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).replace(',', ',') : ''}</p>
                    <p className=" text-sm font-medium pl-80">Third Post : {data[2]?.scheduledDate ? new Date(data[3].scheduledDate as string).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: undefined,
                      hour12: true,
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).replace(',', ',') : ''}</p>

                </Marquee> */}
                {
                  date? 
                  <>
                  <h1 className='text-center'>Date of Publication : {date?.split('T')[0]}</h1>
                  </>
                  :
                  <>
                    <h1 className='text-center'>New Post</h1>
                  </>
                }
              </div>

                <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div onClick={()=>setShowPostStatus(!showPostStatus)} className='cursor-pointer'>
                    {
                      !showPostStatus?
                      <ChevronRight className=" w-4 h-4 text-black" />:
                      <ChevronDown  className=" w-4 h-4 text-black"/>
                    }
                  </div>
                  </button>
                   {showPostStatus && (
                        <div className=" z-10 absolute top-20 right-[3%] xl:right-[8%] 2xl:right-[11%] mt-2 w-60 bg-white rounded-md shadow-lg">
                            <button className=" w-full text-left px-4 py-2 text-md font-semibold text-black hover:bg-gray-100">
                          <Link href={'/dashboard/published-post'}>
                              Published post
                          </Link>
                            </button>
                          <button className="w-full text-left px-4 py-2 text-md font-semibold text-black hover:bg-gray-100">
                          <Link href={'/dashboard/pending-post'}>
                            Pending post
                          </Link>
                          </button>
                      </div>
                    )}
            </div>
  )
}

export default Header