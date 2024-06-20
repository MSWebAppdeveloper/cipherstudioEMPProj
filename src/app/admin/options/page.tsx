"use client"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import OptionsComponent from '@/app/components/admin/options/page';
import EmployeeNavbar from '@/components/EmployeeNavbar'
import Sidebar from '@/components/Sidebar'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const Options =  () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
    <EmployeeNavbar toggleSidebar={toggleSidebar} />
    <div className="flex w-100" id="body-row">
      <Sidebar isCollapsed={isCollapsed} />
      <div className={`right-sec lg:px-8 md:px-4 sm:px-4 ${isCollapsed ? 'collapsed' : ''}`}>
       <OptionsComponent />
          </div>
        </div>
      </div>
  )
}

export default Options
