import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  const [showPostStatus,setShowPostStatus] = useState(false)
  return (
     <div className=" mx-auto  bg-black text-white px-6 py-3 flex items-center justify-between rounded-md ">
                <p></p>
                <p className=" text-sm font-medium">New Post: 11 AM, July 1st, 2025</p>
                <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div onClick={()=>setShowPostStatus(!showPostStatus)}>
                    {
                      !showPostStatus?
                      <ChevronRight className="w-4 h-4 text-black" />:
                      <ChevronDown  className="w-4 h-4 text-black"/>
                    }
                  </div>
                  </button>
                   {showPostStatus && (
          <div className=" z-10 absolute top-20 right-[3%] xl:right-[8%] 2xl:right-[15%] mt-2 w-60 bg-white rounded-md shadow-lg">
              <button className=" w-full text-left px-4 py-2 text-md font-semibold text-black hover:bg-gray-100">
            <Link href={'published-post'}>
                Published post
            </Link>
              </button>
            <button className="w-full text-left px-4 py-2 text-md font-semibold text-black hover:bg-gray-100">
            <Link href={'pending-post'}>
              Pending post
            </Link>
            </button>
        </div>
      )}
            </div>
  )
}

export default Header