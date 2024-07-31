import { FormikProps } from "formik";

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

export interface UserFormValues {
  id: string;
  name: string;
  email: string;
  department: string;
  userRole: string;
  shift: any;
}

export interface UserFormTemplateProps {
  formdata: UserFormValues;
  handleSubmit: (values: UserFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => void;
  handleChange: (e: any) => void;
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
  shift: any;
  errors: registerErrorType;
}