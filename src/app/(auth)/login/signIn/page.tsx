"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { UserLogin } from "@/services/api";
import toast from "react-hot-toast";
import SignInTemplate from "./SignInTemplate";
import { useRouter } from "next/navigation";

const initialFormValues = {
  email: "",
  password: "",
  name: "",
};

function SignIn() {
  const [formdata, setFormdata] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<loginErrorType>({});
  const { data: session } = useSession();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    // Check if there are saved credentials in local storage
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setFormdata({
        ...formdata,
        email: savedEmail,
        password: savedPassword,
      });
    }
  }, []);

  useEffect(() => {
    // Check if userRole exists in localStorage
    const userRole = localStorage.getItem("userRole");

    // Set redirecting to true
    setRedirecting(true);

    // Redirect based on userRole after a short delay
    const redirectTimeout = setTimeout(() => {
      if (userRole === "Management") {
        toast.success("You already logged in");
        router.push("/admin/reports");
      } else if (userRole === "Employee") {
        router.push("/employee/dashboard");
        toast.success("You already logged in");
      }
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(redirectTimeout);
  }, [router]);

  const onChangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const onRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await UserLogin("employee/users/login", formdata);
      if (response.status === 200) {
        const {
          UserId,
          name,
          accessToken,
          refreshToken,
          userRole = "",
        } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("UserId", UserId);
        localStorage.setItem("name", name);
        localStorage.setItem("userRole", userRole);
        sessionStorage.setItem("userRole", userRole);

        // Save email and password in local storage if Remember Me is checked
        if (rememberMe) {
          localStorage.setItem("savedEmail", formdata.email);
          localStorage.setItem("savedPassword", formdata.password);
        } else {
          // Clear saved credentials if Remember Me is unchecked
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
        }

        // Redirect based on user role
        const redirectUrl =
          userRole === "Management" ? "/admin/reports" : "/employee/dashboard";

        await signIn("credentials", {
          email: formdata.email,
          name: formdata.name,
          password: formdata.password,
          callbackUrl: redirectUrl,
          userRole: localStorage.getItem("userRole"),
          redirect: false,
          headers: new Headers({
            "X-User-Role": userRole,
          }),
        });
        router.push(redirectUrl);

        toast.success("User logged in");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        console.error("Error logging in:", error.message);
        toast.error(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInTemplate
      onLogin={onLogin}
      onChangeData={onChangeData}
      formdata={formdata}
      loading={loading}
      errors={errors}
      rememberMe={rememberMe}
      onRememberMeChange={onRememberMeChange}
    />
  );
}

export default SignIn;
