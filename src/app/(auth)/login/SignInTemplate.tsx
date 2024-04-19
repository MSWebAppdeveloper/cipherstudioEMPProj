import React from "react";
import { SignInInterface } from "./SignInInterface";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg px-4 py-8 bg-white shadow-xl ring-1 ring-gray-900/10 rounded-xl">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Sign in
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-8">
            <form method="POST" onSubmit={onLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

                <a
                  href="#"
                  className="text-xs sm:text-sm text-gray-600 hover:text-indigo-500 focus:outline-none mt-2 block"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                    defaultChecked={rememberMe}
                    onChange={onRememberMeChange}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Processing" : "Sign-In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SignInTemplate;
