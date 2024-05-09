"use client";
import React from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SignoutButton({ }: { type?: string }) {
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
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        toast.success("User signed out");
        router.push("/login")
    };


    return (
        <>
            <div>
                <button
                    className="signout p-2  rounded-md"
                    onClick={handleSignOut}
                >
                    <Icon icon="icon-park:logout he" width="2em" height="2em" />
                </button>
            </div>
        </>
    );
}