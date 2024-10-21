import { FormikHelpers } from "formik";


export interface ProjectFormValues {
  id: number;
  projectName: string;
  assignedTo: string[]; // New field for assignedTo
  createdBy?: string; // Optional field for createdBy
}

export interface ProjectFormTemplateProps {
  formdata: ProjectFormValues;
  handleOnSubmit: (values: ProjectFormValues, formikHelpers: FormikHelpers<ProjectFormValues>) => void;
  dataChange: (e: any) => void;
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
  allUsers: any[];
}