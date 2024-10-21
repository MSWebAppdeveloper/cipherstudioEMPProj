import React from 'react'
import { Metadata } from 'next'
import TaskComponent from '@/app/components/admin/tasks/page'
type Props = {}

const Tasks = (props: Props) => {
  return (
    <>
    <TaskComponent/>
    </>
  )
}

export default Tasks
export const metadata: Metadata = {
    title: "Tasks",
  };