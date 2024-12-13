export interface TaskFormData {
  id: string | null;
  projectName: string;
  title: string;
  description: string;
  status: string;
  estimatedTime: string;
  takenTime: string;
  comments: string;
  assignedTo: string[];
}

export interface Project {
  id: number;
  projectName: string;
}

export interface Task {
  id: string;
  projectName: string;
  title: string;
  description: string;
  estimatedTime: string;
  status: string;
  comments: string;
  file: any;
}

export interface TasksFormInterface {
  dataChange: (e: any) => void;
  handleOnSubmit: (
    values: TaskFormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  formdata: TaskFormData;
  isModal: boolean;
  handleClose: () => void;
  loading: boolean;
  projects: { id: number; projectName: string }[];
  handleInProgressTaskSelect: (task: any) => void;
  tasks: Task[];
  allUsers: any[];
  userRole:string;
}

export interface Task {
  id: string;
  title: string;
  // Add other properties if necessary
}
