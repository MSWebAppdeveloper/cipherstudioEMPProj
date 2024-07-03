export interface UserFormProps {
  formData: {
    id: string;
    name: string;
    email: string;
    department: string;
    userRole: string;
    shift: any;
  };
  handleChange: (e: any) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isModal: boolean;
  handleClose: () => void;
  errors: registerErrorType;
  loading: boolean;
  shift: any;
}
