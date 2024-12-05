
export interface RuleFormProps {
  formData: {
    id: string;
    name: string|undefined;

  };
  handleChange: (e: any) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isModal: boolean;
  handleClose: () => void;
  errors: registerErrorType;
  loading: boolean;
}

export interface RuleFormValues {
  id: string;
  name: string;

}

export interface RuleFormTemplateProps {
  formdata: RuleFormValues;
  handleSubmit: (values: RuleFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => void;
  handleChange: (e: any) => void;
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
  errors: registerErrorType;
}