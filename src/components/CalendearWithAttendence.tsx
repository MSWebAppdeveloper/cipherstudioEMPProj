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
  }));


  const eventStyleGetter = (event: any) => {
    let backgroundColor = '';
    switch (event.status) {
      case 'Full Day':
        backgroundColor = 'LightCyan';
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
        backgroundColor = 'LightCyan';
        break;
      default:
        backgroundColor = 'lightgray';
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        color: 'black',
        border: 'none',
        display: 'block',
      },
    };
  };

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
      />
    </div>
  );
};

export default CalendarWithAttendance;
