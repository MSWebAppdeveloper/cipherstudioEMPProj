




export interface UserFormValues {
  id: string;
  email: string;
}

export interface ForgetPasswordProps {
  formdata: UserFormValues;
  handleSubmit: (values: UserFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => void;
  handleChange: (e: any) => void;
 
  loading: boolean;
  errors: registerErrorType;
}