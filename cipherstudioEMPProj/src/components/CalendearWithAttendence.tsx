import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface AttendanceRecord {
  start: Date;
  end: Date;
  title: string;
  date: Date;
  status: string;
comment: string;
}

interface CalendarWithAttendanceProps {
  attendanceData: AttendanceRecord[];
}

const CalendarWithAttendance: React.FC<CalendarWithAttendanceProps> = ({ attendanceData }) => {
  const formattedAttendance = attendanceData.map((attend) => ({
 
    title: attend.title,
    start: new Date(`${attend.date}T${attend.start}`),
    end: new Date(`${attend.date}T${attend.end}`),
    status: attend.status,
 comment: attend.comment,

  }));
  

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '';

    if (event.comment) {
      backgroundColor = 'Lavender'; // Set a special color for events with comments
    } else {
      switch (event.status) {
        case 'Full Day':
          backgroundColor = 'AliceBlue';
          break;
        case "Absent":
          backgroundColor = 'LavenderBlush';
          break;
        case 'Present(forget dayout)':
          backgroundColor = 'PaleGreen';
          break;
        case 'Half Day':
          backgroundColor = 'HoneyDew';
          break;
        case 'Short Leave':
          backgroundColor = 'Ivory';
          break;
        default:
          backgroundColor = 'lightgray';
      }
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '0px',
        color: 'black',
        border: 'none',
        display: 'block',
         width: '100%', 
      height: '100%'
      },
    };
  };
  
  const dayPropGetter = (date: Date) => {
    const currentEvent = attendanceData.find(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );

    let backgroundColor = '';

    if (currentEvent) {
      switch (currentEvent.status) {
        case 'Absent':
          backgroundColor = 'LavenderBlush';
          break;
        case 'Full Day':
          backgroundColor = 'AliceBlue';
          break;
        case 'Present(forget dayout)':
          backgroundColor = 'PaleGreen';
          break;
        case 'Half Day':
          backgroundColor = 'HoneyDew';
          break;
        case 'Short Leave':
          backgroundColor = 'Ivory';
          break;
        default:
          backgroundColor = 'lightgray';
      }
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };
  
  const CustomEvent = ({ event }: { event: any }) => (
    <div>
      <strong>{event.title}</strong>
      {event.comment && (
        <div style={{ fontSize: '0.85em', color: 'gray' }}>
          {event.comment}
        </div>
      )}
    </div>
  );
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={formattedAttendance}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '800px', marginTop: '30px' }}
        views={['month', 'week']}
        eventPropGetter={eventStyleGetter}
      dayPropGetter={dayPropGetter}
        components={{
          event: CustomEvent, 
        }}
        messages={{
          previous: 'Previous',

        }}
      />
    </div>
  );
};

export default CalendarWithAttendance;
