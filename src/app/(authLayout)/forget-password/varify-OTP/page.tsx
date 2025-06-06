'use client';
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderPart from "@/components/auth/HeaderPart";
import Link from "next/link";

const page = () => {
     const router = useRouter();
    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    
    const handleSubmit = (e: FormEvent<HTMLFormElement | undefined>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        // console.log(email, password);
        
    };

    return (
        <div className="  h-screen">
            <div className="h-full ">
                {/* Left Side - Image */}
                {/* <div>
                    <HeaderPart />
                </div> */}

                {/* Right Side - Login Form */}
                <div className="lg:col-span-2 h-screen rounded-lg flex flex-col justify-center gap-10">
                    <div className="w-full px-5 lg:px-0 lg:w-[80%] xl:w-[60%] mx-auto space-y-12">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800  text-start">Varify Your OTP?</h2>
                        <p className="text-[14px]   font-medium text-gray-400  text-start">We send an OTP number to your email. Please check your email; then copy OTP number and paste here.</p>
                        <form onSubmit={handleSubmit} className=" space-y-10">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="otp" className="block text-md font-semibold text-gray-600">Enter OTP</label>
                                <input type="number" required id="otp" name="otp" placeholder="Enter your Email" className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"/>
                            </div>

                            
                            {/* Submit Button */}
                            <Link href={'/forget-password/change-password'}>
                             <button
                                type="submit"
                                className="w-full bg-black text-white py-5 px-4 rounded-xl hover:bg-green-600 transition duration-300 cursor-pointer"
                            >
                                Varify OTP
                            </button></Link>
                        </form>

                    </div>
                </div>
              
            
            </div>
        </div>
    );
};

export default page;