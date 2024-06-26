import React from "react";
import { SignInInterface } from "./SignInInterface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const SignInTemplate: React.FC<SignInInterface> = ({
  onChangeData,
  onLogin,
  formdata,
  loading,
  errors,
  rememberMe,
  onRememberMeChange,
}) => (
  <>
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-screen  bg-white lg:col-span-5 md:col-span-5 lg:h-screen xl:col-span-6 align-center  img-sec">
          <Image
            width="7500"
            height="5000"
            alt="img"
            src="/login-img.jpg"
            className="h-screen  w-full object-contain md:w-50 md:mx-auto sm:w-50 sm:mx-auto"
            priority={true}
          />
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-8 xl:col-span-6 right">
          <div className="max-w-xl lg:max-w-2xl px-12 w-full">
            <div className="flex justify-center">
              <Image
                width="800"
                height="185"
                src="/cipher-1.png"
                alt="logo-img"
                className="w-1/2 md:mb-6 lg:mb-0 sm:mb-3"
              />
            </div>
            <div className="relative -mt-16 block lg:hidden" />
            {/*form-start*/}
            <div className="bg-white shadow-lg px-11 pt-9 lg:mt-6 pb-16 md:mt-20 sm:mt-20 form-sec">
              <form
                onSubmit={onLogin}
                className="mt-3 lg:pb-12 pt-5 sm:pb-9 login-form"
              >
                <h1 className="text-4xl mb-20 mt-5 text-center text-color pb-2 text-blue-500 focus:ring-blue-500">
                  Login
                </h1>
                <div className="col-span-6 input-sec relative mb-10">
                  <label
                    htmlFor="email"
                    className="block text-md text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <Icon icon="ph:user" className="form-icon" />
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-full border-gray-300 bg-white text-sm text-gray-700 shadow-md border py-4 px-12"
                    placeholder="your@email.com"
                    name="email"
                    value={formdata.email}
                    onChange={onChangeData}
                    required
                  />
                  <span className="text-xs font-semibold text-red-500 block mt-1">
                    {errors?.Email}
                  </span>
                </div>
                <div className="col-span-6 input-sec relative">
                  <label
                    htmlFor="password"
                    className="block text-md text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Icon icon="uil:padlock" className="form-icon" />
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-full border-gray-300 bg-white text-sm text-gray-700 shadow-md border py-4 px-12"
                    placeholder="Enter your password"
                    name="password"
                    value={formdata.password}
                    onChange={onChangeData}
                    required
                    autoComplete=""
                  />
                  <span className="text-xs font-semibold text-red-500 block mt-1">
                    {errors?.Password}
                  </span>
                </div>
                <div className="col-span-6 justify-between flex items-center mt-3">
                  <label htmlFor="remember" className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded-md border-gray-200 bg-white shadow-sm"
                      defaultChecked={rememberMe}
                      onChange={onRememberMeChange}
                    />
                    <span className="text-color text-xs">Remember me</span>
                  </label>
                  <div>
                    <a href="#" className="text-xs text-color">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-center lg:mt-14 md:mt-14 sm:mt-6 flex login-button">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-full text-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:mb-16 md:mb-16 sm:mb-8 shadow-lg"
                  >
                    {loading ? "Processing" : "Sign-In"}
                  </button>
                </div>
              </form>
            </div>
            {/*form-end*/}
          </div>
        </main>
      </div>
    </section>

  </>
);

export default SignInTemplate;
