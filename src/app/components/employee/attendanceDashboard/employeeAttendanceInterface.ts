import { ReactNode } from "react";

export interface EmployeeAttendanceInterface {
  currentTime: string;
  formattedElapsedTime: string;
  handleSignIn: (e: any) => void;
  handleSignOut: (e: any) => void;
  isDayInActive: boolean;
  isDayOutActive: boolean;
  status: string;
}
