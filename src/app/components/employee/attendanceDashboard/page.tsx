"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import EmployeeTemplate from "./employeeTemplate";
import toast from "react-hot-toast";

const EmployeePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [timeIn, setTimeIn] = useState("-");
  const [timeOut, setTimeOut] = useState("-");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [attendanceId, setAttendanceId] = useState<string | null>(null);
  const [isDayInActive, setIsDayInActive] = useState(true);
  const [isDayOutActive, setIsDayOutActive] = useState(false);
  const [dayOutClicked, setDayOutClicked] = useState(false);
  const [status, setStatus] = useState("--");
  const [totalRecordTime, setTotalRecordTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerIn, setTimerIn] = useState("-");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalIdRef: React.MutableRefObject<ReturnType<typeof setInterval> | null> = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = React.useRef<number>(0);
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      const currentDateFormatted = now.toLocaleDateString();
      if (currentDateFormatted !== currentDate) {
        setTimeIn("-");
        setTimeOut("-");
        setIsClockedIn(false);
        setCurrentDate(currentDateFormatted);
      }
    };

    const checkAttendanceStatus = async () => {
      try {
        const userId = localStorage.getItem("UserId");
        const url = "employee/attendance/status";
        // const res= await Attendance("attendance/status")
        const response = await axios.get(
          "http://192.168.1.25:8082/api/employee/attendance/status",
          { params: { UserId: userId } }
        );
        const { isClockedIn, attendanceId, existingEntry } = response.data;
        if (existingEntry) {
          setStatus(existingEntry.status);
          setTimerIn(existingEntry.timeIn);
        } else {
          setStatus("--");
        }
        setIsClockedIn(isClockedIn);
        setTimeIn(isClockedIn ? response.data.timeIn : "-");
        setTimeOut(isClockedIn ? response.data.timeOut : "-");
        setAttendanceId(attendanceId);
        setIsDayInActive(!isClockedIn);
        setIsDayOutActive(isClockedIn && !existingEntry.timeOut);

        // Start the timer if user is already clocked in
        if (isClockedIn && existingEntry && !existingEntry.timeOut) {
          setTimerActive(true);
          startTimeRef.current = new Date().getTime();
        }
      } catch (error) {
        console.error("Error checking attendance status:", error);
      }
    };
    checkAttendanceStatus();

    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);


  }, [currentDate]);

  const handleSignIn = async () => {
    try {
      const currentDate = new Date();
      const response = await axios.post(
        "http://192.168.1.25:8082/api/employee/attendance/signin",
        {
          UserId: localStorage.getItem("UserId"),
          timeIn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          date: new Date(currentDate).toISOString().split("T")[0],
        }
      );
      setIsClockedIn(true);
      setTimeIn(response.data.timeIn);
      setAttendanceId(response.data.id);
      setTimeOut("-");
      setStatus(response.data.status);
      toast.success("Day-in successful");
      setIsDayInActive(false);
      setIsDayOutActive(true);

      // Start the timer
      setTimerActive(true);
      startTimeRef.current = new Date().getTime();
      const id: any = setInterval(() => {
        setTotalRecordTime((prevTime) => prevTime + 1);
      }, 1000);
      intervalIdRef.current = id;

      setIntervalId(id);
    } catch (error: any) {
      console.error("Error Day in:", error);
      toast.error(error.response?.data?.error);
    }
  };

  const handleSignOut = async () => {
    try {
      const formattedTimeOut = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const response = await axios.put(
        `http://192.168.1.25:8082/api/employee/attendance/signout/${attendanceId}`,
        {
          timeOut: formattedTimeOut,
        }
      );
      setIsClockedIn(false);
      setTimeOut(response.data.timeOut);
      toast.success("Day-out successful");
      setStatus(response.data.status);
      setIsDayInActive(true);
      setIsDayOutActive(false);
      setDayOutClicked(true);
      setTimerActive(false); // Stop the timer

      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
      setTimerActive(false);
      // Reset total record time

      // Reset total record time
      setElapsedTime(0)
    } catch (error: any) {
      console.error("Error Day out:", error);
    }
  };


  // Function to convert time strings to seconds since midnight
  const timeToSeconds = (timeString: string) => {
    const parts = timeString.split(":");
    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    // Convert 12-hour format to 24-hour format if necessary
    if (timeString.includes("PM") && hours !== 12) {
      hours += 12;
    } else if (timeString.includes("AM") && hours === 12) {
      hours = 0;
    }

    return hours * 3600 + minutes * 60 + seconds;
  };
  // Convert current time and timer in to seconds since midnight
  const currentTimeInSeconds = timeToSeconds(currentTime);
  const timerInSeconds = timeToSeconds(timerIn);

  // Calculate the difference in seconds
  const timeDifferenceInSeconds = currentTimeInSeconds - timerInSeconds;



  useEffect(() => {
    if (timerActive) {
      setElapsedTime(Math.abs(timeDifferenceInSeconds));
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeDifferenceInSeconds, timerActive]);


  const secondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secondsLeft).padStart(2, "0")}`;
  };

  // Convert the difference in seconds to a formatted time string
  const formattedElapsedTime = secondsToTime(elapsedTime);


  return (
    <EmployeeTemplate
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      currentTime={currentTime}
      isDayInActive={isDayInActive}
      isDayOutActive={isDayOutActive}
      status={status}
      formattedElapsedTime={formattedElapsedTime}
    />
  );
};

export default EmployeePage;
