import { FormikHelpers } from "formik";


export interface ProjectFormValues {
  id: number;
  projectName: string;
}

export interface ProjectFormTemplateProps {
  formdata: ProjectFormValues;
  handleOnSubmit: (values: ProjectFormValues, formikHelpers: FormikHelpers<ProjectFormValues>) => void;
  dataChange: (e: any) => void;
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
}