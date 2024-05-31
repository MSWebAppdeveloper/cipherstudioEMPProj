import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import OptionsComponent from '@/app/components/admin/options/page';
import EmployeeNavbar from '@/components/EmployeeNavbar'
import Sidebar from '@/components/Sidebar'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Options = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }
  return (
    <div className="Wrapper">
        <EmployeeNavbar />
        <div className="flex w-100 second-sec">
          <Sidebar />
          <div className="right-sec-2 lg:px-8 md:px-4 sm:px-4">
            <OptionsComponent />
          </div>
        </div>
      </div>
  )
}

export default Options
