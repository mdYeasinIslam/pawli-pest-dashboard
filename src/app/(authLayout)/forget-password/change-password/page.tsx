'use client';
import React, { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "@/redux/services/Api/auth/authApi";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const page = () => {
    // Importing the useAppDispatch hook to dispatch actions
    // const dispatch = useAppDispatch()
    // Using the loginUser mutation from authApi
    const [updatePassword] = useUpdatePasswordMutation()
     const router = useRouter();
    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordSecond, setShowPasswordSecond] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }
    const togglePasswordVisibilityForSecond = () => {
        setShowPasswordSecond((prev) => !prev);

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement | undefined>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword");
        const confirmPassword = formData.get("confirmPassword");

        //get token and decode it through jwtDecode
        const token = localStorage.getItem('token') || ''
        const decode = jwtDecode<JwtPayload>(token)
        const email = decode.email
        console.log(newPassword,confirmPassword,email)
       try {
            if(!confirmPassword || !newPassword) {
               return toast.error("password are required");
           }
            // Dispatching the loginUser mutation with email and password
            updatePassword({ email, password:confirmPassword })
                .unwrap()
                .then((response) => {
                    console.log("Password Updated successfully", response);
                    if (response?.success) { 
                        toast.success(response?.message);
                        // dispatch(setToken(response?.data?.token));
                        localStorage.removeItem('token')
                        router.push('/');
                    } 
                })
                .catch((error) => {
                    console.error("Password Updated error inside:", error);
                    toast.error(error?.data?.message);
                });
           
       } catch (error) {
        console.error("Password Updated error outside:", error);
       }
    };

    return (
        <div className="  h-screen">
            <div className="">
                {/* Left Side - Image */}
                {/* <div>
                    <HeaderPart />
                </div> */}

                {/* Right Side - Login Form */}
               <div className="lg:col-span-2 h-screen rounded-lg flex flex-col justify-center gap-10">
                    <div className="w-full px-5 lg:px-0 lg:w-[80%] xl:w-[60%] mx-auto space-y-12">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800  text-start">Create new password</h2>
                       
                        <form onSubmit={handleSubmit} className=" space-y-10">
                            {/* Email Input */}
                             <div className=" relative">
                                  <label htmlFor="newPassword"  className="block text-sm font-medium text-gray-700">
                                     New Password
                                  </label>
                                  <div onClick={togglePasswordVisibility} className="absolute right-3 top-9 text-gray-500 cursor-pointer z-10">

                                      {
                                          showPassword ? (
                                              <EyeOff />
                                          ) : (
                                              <Eye  />
                                          )
                                      }
                                  </div>
                                  <input
                                      type={showPassword ? "text" : "password"}
                                      id="newPassword"
                                    name="newPassword"
                                    required
                                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter your password"
                                  />
                              </div>
                              <div className=" relative">
                                  <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700">
                                     Confirm Password
                                  </label>
                                  <div onClick={togglePasswordVisibilityForSecond} className="absolute right-3 top-9 text-gray-500 cursor-pointer z-10">

                                      {
                                          showPasswordSecond ? (
                                              <EyeOff />
                                          ) : (
                                              <Eye  />
                                          )
                                      }
                                  </div>
                                  <input
                                        type={showPasswordSecond ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        required
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your password"
                                  />
                              </div>
                            
                            {/* Submit Button */}
                            
                             <button
                                type="submit"
                                className="w-full bg-black text-white py-5 px-4 rounded-xl hover:bg-green-600 transition duration-300 cursor-pointer"
                            >
                                Save Password
                            </button>
                        </form>

                    </div>
                </div>
              
            
            </div>
        </div>
    );
};

export default page;