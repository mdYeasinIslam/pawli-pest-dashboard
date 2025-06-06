import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link';
import React, { FormEvent } from 'react'

type FormPartProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement | undefined>) => void;
    togglePasswordVisibility: () => void;
    showPassword: boolean;
    page:string
};

const FormPart = ({ handleSubmit, togglePasswordVisibility, showPassword, page }: FormPartProps) => {
    

  return (
     <form onSubmit={handleSubmit} className=" space-y-8">
                            {/* Email Input */}
                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                  name="email"
                  required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Input */}
                            {
                                page ==='signIn' && 
                                <div className=" relative">
                                    <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div onClick={togglePasswordVisibility} className="absolute right-3 top-8 text-gray-500 cursor-pointer z-10">

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
                                        id="password"
                                        name="password"
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            }

                             <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                <input type="checkbox" id="remember-me" name="remember-me" className="mr-2"/>
                                <label htmlFor="remember-me" className="text-sm text-gray-600">Remember me</label>
                                </div>
                                <Link href="/forget-password" className="text-sm text-blue-500">Forgot password?</Link>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 cursor-pointer"
                            >
                                Log in
                            </button>
                        </form>
  )
}

export default FormPart