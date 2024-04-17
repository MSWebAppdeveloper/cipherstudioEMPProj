export interface UserTableProps {
  formValues: {
    name: string;
    email: string;
    department: string;
    userRole: string;
    isActive: boolean;
  };
  allUsers?: Array<{
    id: string;
    name: string;
    email: string;
    department: string;
    userRole: string;
    isActive: boolean;
  }>;
  deleteSelected: (user: any) => void;
  openEditPopup: (user: any) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDeleteUser: (user: any) => void;
  cancelDeleteUser: (user: any) => void;
  isDeleteConfirmationVisible:boolean;
  handleToggleUserStatus: (userId: string, isActive: boolean) => void;
}
