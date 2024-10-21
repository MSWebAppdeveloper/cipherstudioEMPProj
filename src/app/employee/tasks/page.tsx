import TasksComponent from '@/app/components/employee/tasks/page'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

const Tasks = (props: Props) => {
  return (
    <>
    <TasksComponent/>
    </>
  )
}

export default Tasks

export const metadata: Metadata = {
    title: "Tasks",
  };