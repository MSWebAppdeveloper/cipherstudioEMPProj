"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';
import EmployeePageLoading from '@/skeletonComponent/EmployeePageLoading';

const HomePage = () => {
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);
    const userRole = localStorage.getItem('userRole');

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
    },1000);

        // Cleanup function to clear the timeout
        return () => clearTimeout(redirectTimeout);
    }, [router]);

    return (
        <div >
            {redirecting && 
            // <p className="text-red-700">Redirecting...</p> 
           userRole === 'Management' ?
           <Loading/>:
        <EmployeePageLoading/>
            }
            {!redirecting && (
                <h3 className="text-2xl font-bold md:text-2xl">
                    Click{' '}
                    <span className="text-red-700">
                        <Link href="/">here </Link>
                    </span>{' '}
                    to Login.
                </h3>
            )}
        </div>
    );
};

export default HomePage;
