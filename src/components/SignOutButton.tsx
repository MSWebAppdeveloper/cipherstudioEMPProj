"use client";
import React from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SignoutButton({}: { type?: string }) {
  const router = useRouter();
  const handleSignOut: any = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: false,
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("UserId");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("shift");
    toast.success("User signed out");
    router.push("/login");
  };

  return (
    <>
      <div className="px-2">
        <div
          className="signout flex items-center p-2  rounded-md"
          onClick={handleSignOut}
        >
          <div className="mr-2">
            <Icon
              icon="ic:round-logout"
              width="20"
              height="20"
              style={{ color: "#1565e5" }}
            />
          </div>
          <span className="font-medium text-sm flex ml-2">Logout</span>
        </div>
      </div>
    </>
  );
}