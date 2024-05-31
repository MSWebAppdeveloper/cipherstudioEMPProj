export interface LeaveFormProps {
  formData: {
    leave_type_id: number;
    leave_type_name: string;
    assign_year:string;
    allowed_leaves: string;
    leave_description: string;
  };
  handleChange: (e: any) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isModal: boolean;
  handleClose: () => void;
  errors: registerErrorType;
  loading: boolean;
}
