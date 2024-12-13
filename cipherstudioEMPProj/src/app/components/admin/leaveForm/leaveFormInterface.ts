

export interface LeaveFormValues {
  leave_type_id: number;
  leave_type_name: string;
  assign_year: string;
  allowed_leaves: string;
  leave_description: string;
}

export interface LeaveFormTemplateProps {
  formdata: LeaveFormValues;
  dataChange: (
    e: any
  ) => void;
  handleOnSubmit: (values: LeaveFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => void;
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
}