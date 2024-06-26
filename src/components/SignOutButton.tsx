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
          
                <div
                    className="signout p-2 flex   rounded-md cursor-pointer"
                    onClick={handleSignOut}
                >
<Icon icon="material-symbols:logout-sharp" width="20" height="20"  style={{color: `#1565e5`}} />    
             </div>
            
        </>
    );
}