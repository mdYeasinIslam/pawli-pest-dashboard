import Image from 'next/image'
import React from 'react'
type Prop = {
    page:string
}

const HeaderPart = () => {
  return (
     <div className="h-full   bg-[#141A19] text-white flex flex-col justify-center items-center" >
                    <div className="max-w-6xl w-full p-3 lg:p-0 lg:w-[90%] mx-auto flex flex-col gap-10">
                        {/* <!-- Logo Image (Placeholder) --> */}
                        <Image src="/logo.png" alt="Logo" className=" w-40" width={500} height={500}/>
                        <div className="space-y-3">
                            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">Manage your post  the best way</h1>
                            <p className="text-sm lg:text-lg">Awesome, we’ve created the perfect place for you to store all your documents.</p>
                        </div>
                        <Image src="/loginImg.png" alt="Image" className="w-80 h-80" width={500} height={500} />
                        </div>
                    {/* <!-- Bottom Image (Placeholder) --> */}
                </div>
  )
}

export default HeaderPart