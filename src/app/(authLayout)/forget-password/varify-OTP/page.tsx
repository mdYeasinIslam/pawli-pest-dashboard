'use client';
import React, { FormEvent } from "react";
import {  useRouter } from "next/navigation";
import { useVarifyOTPMutation } from "@/redux/services/Api/auth/authApi";
import { toast } from "sonner";

const page = () => {
    const [varifyOTP] = useVarifyOTPMutation()
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement | undefined>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = localStorage.getItem('email')
        const otp = Number(formData.get("otp"))
        
       try {
            if(!otp) {
                return toast.error("Please enter OTP code");
            }
            // Dispatching the loginUser mutation with otp
            varifyOTP({email, otp})
            .unwrap()
            .then((response) => {
                    console.log( response);
                    if (response?.success) { 
                        
                            localStorage.setItem("token", response?.data?.token);
                            // dispatch(setToken(response?.data?.token));
                            toast.success(response?.data?.message);
                            localStorage.removeItem('email')
                            router.push('/forget-password/change-password');
                    } 
                })
                .catch((error) => {
                    console.error("OTP error Inside:", error);
                    toast.error(error?.data?.message +'inside');
                });
           
       } catch (error) {
        console.error("OTP error outside:", error);
       }
    };

    return (
        <div className="  h-screen">
            <div className="h-full ">
                {/* Right Side - Login Form */}
                <div className="lg:col-span-2 h-screen rounded-lg flex flex-col justify-center gap-10">
                    <div className="w-full px-5 lg:px-0 lg:w-[80%] xl:w-[60%] mx-auto space-y-12">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800  text-start">Varify Your OTP?</h2>
                        <p className="text-[14px]   font-medium text-gray-400  text-start">We send an OTP number to your email. Please check your email; then copy OTP number and paste here.</p>
                        <form onSubmit={handleSubmit} className=" space-y-10">
                            {/* Email Input */}
                            {/* <div className="space-y-2">
                                <label htmlFor="email" className="block text-md font-semibold text-gray-600">Email</label>
                                <input  type="email" required id="email" name="email" placeholder="Enter your Email" className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"/>
                            </div> */}
                            <div className="space-y-2">
                                <label htmlFor="otp" className="block text-md font-semibold text-gray-600">Enter OTP</label>
                                <input type="number" required id="otp" name="otp" placeholder="Enter OTP" className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"/>
                            </div>

                            
                            {/* Submit Button */}
                             <button
                                type="submit"
                                className="w-full bg-black text-white py-5 px-4 rounded-xl hover:bg-green-600 transition duration-300 cursor-pointer"
                            >
                                Varify OTP
                            </button>
                        </form>

                    </div>
                </div>
              
            
            </div>
        </div>
    );
};

export default page;