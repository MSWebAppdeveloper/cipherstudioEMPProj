import { FormikHelpers } from "formik";

export interface LeaveRequestFormInterface {
  handleOnSubmit: (values: LeaveFormData, formikHelpers: FormikHelpers<LeaveFormData>) => void;
  dataChange: (e: any) => void;
  formdata: LeaveFormData;
  leaveTypes: { leave_type_id: number; leave_type_name: string }[];
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
}

export interface LeaveFormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}