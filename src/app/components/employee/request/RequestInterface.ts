export interface RequestInterface {
  // deleteSelected: (user: any) => void;
  openEditPopup: (user: any) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: any;
  leaveHistory: {
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
  }[];
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  leaveOverview: any;
  onDelete: (e: any) => void;
}
