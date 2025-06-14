'use client';
import React, { FormEvent, useState } from "react";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";
import FormPart from "@/components/auth/FormPart";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginUserMutation } from "@/redux/services/Api/auth/authApi";
import { setToken } from "@/redux/services/Api/auth/authSlice";
import HeaderPart from "@/components/auth/HeaderPart";
import Cookies from "js-cookie";
import LoadingSpinner from "./loading";

const LoginPage = () => {
    // Importing the useAppDispatch hook to dispatch actions
    const dispatch = useAppDispatch()
    // Using the loginUser mutation from authApi
    const [loginUser] = useLoginUserMutation()
     const router = useRouter();
    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    
    const handleSubmit = (e: FormEvent<HTMLFormElement | undefined>) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        // toast.success('Login successfull')
        // redirect('/')
        try {
            if(!email || !password) {
                return toast.error("Email and password are required");
            }
            // Dispatching the loginUser mutation with email and password
            console.log(email, password);
            loginUser({ email, password })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    if (response?.data?.role ==='ADMIN') {
                            console.log("Login successful:", response);
                            // localStorage.setItem("token", response?.data?.token);
                            Cookies.set("token", response?.data?.token);


                            dispatch(setToken(response?.data?.token));
                            toast.success(response?.message + ' as Admin');
                            router.push('/dashboard');
                            setLoading(false)
                        }
                        else {
                            
                            toast.error( `You role is ${response?.data?.role}!! You don't have permission to access Dashboard`);
                            router.push('/error-page')
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.error("Login failed inside:", error);
                    toast.error(error?.data?.message +'inside' || "Login failed inside");
                });
           
       } catch (error) {
        setLoading(false)
        console.error("Login failed outside:", error);
       }
    };

    return (
        <div className={` h-screen ${loading?'brightness-75 opacity-60':""}`}>
            <div className="h-full grid grid-cols-3">
                {/* Left Side - Image */}
                <div>
                    <HeaderPart />
                </div>
                {
                    loading && <div className="absolute text-green-800 right-[50%]"><LoadingSpinner/></div>
                }
                {/* Right Side - Login Form */}
                <div className="col-span-2 h-screen rounded-lg flex flex-col justify-center gap-10">
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

