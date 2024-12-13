import { Skeleton } from "@/skeletonComponent/Skeleton";
import React from "react";


const LoginLoading = () => {
    return (
        <>


            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-screen bg-white lg:col-span-5 md:col-span-5 lg:h-screen xl:col-span-6 align-center img-sec">
                        <div className="w-full h-screen bg-gray-300 animate-pulse" />
                    </section>
                    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-8 xl:col-span-6 right">
                        <div className="max-w-xl lg:max-w-2xl px-12 w-full form-spacing">
                            {/* Logo Skeleton */}
                            <div className="flex justify-center mb-6">
                                <Skeleton className="h-16 w-1/2" />
                            </div>
                            <div className="relative -mt-16 block lg:hidden" />
                            {/* Form Skeleton */}
                            <div className="bg-white shadow-lg form-sec rounded-sm p-6 ">
                                {/* Form Title Skeleton */}
                                <Skeleton className="h-12 w-1/2 mb-5 mx-auto" />

                                <form className="login-form">
                                    {/* Email Field Skeleton */}
                                    <div className="col-span-6 input-sec lg:mb-10 md:mb-10 sm:mb-5">
                                   
                                        <Skeleton className="h-12 w-full rounded-full  mb-4" />
                                    </div>

                                    {/* Password Field Skeleton */}
                                    <div className="col-span-6 input-sec lg:mb-10 md:mb-10 sm:mb-5">
                                  
                                        <Skeleton className="h-12 w-full rounded-full  mb-2" />
                                    </div>

                                    {/* Remember Me & Forgot Password Skeleton */}
                                    <div className="col-span-6 justify-between flex items-center ">
                                        <Skeleton className="h-6 w-20" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>

                                    {/* Submit Button Skeleton */}
                                    <div className="col-span-6 login-button lg:mb-10 md:mb-10 sm:mb-5 text-center">
                                        <Skeleton className="h-12 w-1/2 rounded-full mx-auto my-6" />
                                    </div>
                                </form>
                            </div>
                            {/* Form Skeleton End */}
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
};






export default LoginLoading;
