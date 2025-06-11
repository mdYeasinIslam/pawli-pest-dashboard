'use client';
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForgetPasswordMutation } from "@/redux/services/Api/auth/authApi";
import { toast } from "sonner";

const ForgetPassword = () => {
    const router = useRouter();
    const [forgetPassword] = useForgetPasswordMutation()

    
    const handleSubmit = (e: FormEvent<HTMLFormElement | undefined>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        try {
            if (!email) {
                return toast.error('please enter your email')
            }
            forgetPassword({ email })
            .unwrap()
            .then((response) => {
                console.log(response);
                if (response?.success) { 
                    localStorage.setItem("email", String(email));
                    toast.success(response?.message);
                //    dispatch(setToken(response?.data?.token));
                    router.push(`/forget-password/varify-OTP`)
                } 
                })
                .catch((error) => {
                    console.error("forgot pass-error inside:", error);
                    toast.error(error?.data?.message);
                });
            
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="  h-screen">
            <div className="h-full">


                {/* Right Side - Login Form */}
                <div className="lg:col-span-2 h-screen rounded-lg flex flex-col justify-center gap-10">
                    <div className="w-full px-5 lg:px-0 lg:w-[80%] xl:w-[60%] mx-auto space-y-12">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800  text-start">Forgot your password?</h2>
                        <p className="text-[14px]   font-medium text-gray-400  text-start">Enter your email address and we will send you instructions on <br /> how to reset your password.</p>
                        <form onSubmit={handleSubmit} className=" space-y-10">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-md font-semibold text-gray-600">Email</label>
                                <input  type="email" required id="email" name="email" placeholder="Enter your Email" className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"/>
                            </div>

                            
                            {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-5 px-4 rounded-xl hover:bg-green-600 transition duration-300 cursor-pointer"
                                >
                                    Recover Email
                                </button> 
                        </form>

                    </div>
                </div>
              
            
            </div>
        </div>
    );
};

export default ForgetPassword;