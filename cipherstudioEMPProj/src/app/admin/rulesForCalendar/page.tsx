import RulesForCalendar from '@/app/components/admin/rulesForCalendar/page'
import { Metadata } from 'next'
import React from 'react'

const CalendarRules = () => {
  return (
    <div>
      <RulesForCalendar/>
    </div>
  )
}

export default CalendarRules
export const metadata: Metadata = {
    title: "Rules For Calendar",
  };
