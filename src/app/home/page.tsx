"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        // Check if userRole exists in localStorage
        const userRole = localStorage.getItem('userRole');

        // Set redirecting to true
        setRedirecting(true);

        // Redirect based on userRole after a short delay
        const redirectTimeout = setTimeout(() => {
            if (userRole === 'Management') {
                router.push('/admin/reports');
            } else if (userRole === 'Employee') {
                router.push('/employee/dashboard');
            }
        }, 1000);

        // Cleanup function to clear the timeout
        return () => clearTimeout(redirectTimeout);
    }, [router]);

    return (
        <div className="home-container h-screen grid items-center content-center text-center px-4 py-8 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold md:text-4xl">
                Welcome to Your Attendance Page
            </h1>
            {redirecting && <p className="text-red-700">Redirecting...</p>}
            {!redirecting && (
                <h3 className="text-2xl font-bold md:text-2xl">
                    Click{' '}
                    <span className="text-red-700">
                        <Link href="/login">here </Link>
                    </span>{' '}
                    to Login.
                </h3>
            )}
        </div>
    );
};

export default HomePage;
