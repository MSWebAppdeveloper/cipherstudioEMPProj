"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import { Toaster } from "react-hot-toast";
import NextAuthProvider from "./provider/NextAuthProvider";
   
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body className="h-screen">

        {loading ? (
          <Loader />
        ) : (
          <main>
            <NextAuthProvider>
              {children}
            </NextAuthProvider>
          </main>
        )}
        <Toaster />

      </body>
    </html>
  );
}
