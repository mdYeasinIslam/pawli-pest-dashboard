'use client';
import React, { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
// import { useAppDispatch } from "@/redux/hooks";
// import { useLoginUserMutation } from "@/redux/services/auth/authApi";
// import { setToken } from "@/redux/services/auth/authSlice";
import {  redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderPart from "@/components/auth/HeaderPart";
import FormPart from "@/components/auth/FormPart";

const LoginPage = () => {
    // Importing the useAppDispatch hook to dispatch actions
    // const dispatch = useAppDispatch()
    // Using the loginUser mutation from authApi
    // const [loginUser] = useLoginUserMutation()
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
        console.log(email, password);
        toast.success('Login successfull')
        redirect('/')
    //    try {
    //         if(!email || !password) {
    //            return toast.error("Email and password are required");
    //        }
    //         // Dispatching the loginUser mutation with email and password
    //         loginUser({ email, password })
    //             .unwrap()
    //             .then((response) => {
    //                 console.log("Login successful:", response);
    //                 if (response?.success) { 
    //                     localStorage.setItem("token", response?.data?.token);
    //                     toast.success(response?.message);
    //                     dispatch(setToken(response?.data?.token));
                       
    //                     router.push('/');
    //                 } 
    //             })
    //             .catch((error) => {
    //                 console.error("Login failed inside:", error);
    //                 toast.error(error?.data?.message +'inside' || "Login failed inside");
    //             });
           
    //    } catch (error) {
    //     console.error("Login failed outside:", error);
    //    }
    };

    return (
        <div className="  h-screen">
            <div className="">
                {/* Left Side - Image */}
                {/* <div>
                    <HeaderPart />
                </div> */}

                {/* Right Side - Login Form */}
                <div className=" h-screen rounded-lg flex flex-col justify-center gap-10">
                    <div className="w-1/2  mx-auto space-y-12">
                        <h2 className="text-6xl font-bold text-gray-800  text-start">Login</h2>
                        <FormPart
                            handleSubmit={handleSubmit}
                            togglePasswordVisibility={togglePasswordVisibility}
                            showPassword={showPassword}
                            page='signIn'
                        />

                    </div>
                </div>
              
            
            </div>
        </div>
    );
};

export default LoginPage;