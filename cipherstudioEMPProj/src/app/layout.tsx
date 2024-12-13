"use client";
import "./globals.css";
import { useState, useEffect, CSSProperties } from "react";
import Loader from "@/components/common/Loader";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "./provider/NextAuthProvider";
import EmployeeNavbar from "@/components/EmployeeNavbar";
import Sidebar from "@/components/Sidebar"; 
import 'react-tooltip/dist/react-tooltip.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from "./Loading";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  let [color, setColor] = useState("#000000");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Determine if sidebar and navbar should be shown based on router pathname
  const showSidebarAndNavbar = pathname.startsWith("/admin") || pathname.startsWith("/employee");
  const override: CSSProperties = {
    display: "block",
    margin: "400px auto",
    borderColor: "black",
  };
  return (
    <html lang="en">
      <body className="h-screen">
        {loading ? (
          // <Loader />
          // <Loading/>
          <ClimbingBoxLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        ) : (
          <main>
            <NextAuthProvider>
              <div>
                {showSidebarAndNavbar ? (
                  <>
                    <EmployeeNavbar toggleSidebar={toggleSidebar} />
                    <div className="flex w-100" id="body-row">
                      <Sidebar isCollapsed={isCollapsed} />
                      <div
                        className={`right-sec lg:px-8 md:px-4 sm:px-4 ${
                          isCollapsed ? "collapsed" : ""
                        }`}
                      >
                        {children}
                     
                      </div>
                    </div>
                  </>
                ) : (
                  <>{children}</>
                )}
              </div>
            </NextAuthProvider>
          </main>
        )}
        
        <Toaster />
      
      </body>
      
    </html>
  );
}
