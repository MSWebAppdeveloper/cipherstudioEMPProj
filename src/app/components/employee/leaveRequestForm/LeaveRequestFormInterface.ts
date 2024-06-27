import { ChangeEvent, FormEvent } from "react";

export interface LeaveRequestFormInterface {
  handleOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
  dataChange: (e: any) => void;
  formdata: {
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
  };
  leaveTypes: { leave_type_id: number; leave_type_name: string }[];
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
}
