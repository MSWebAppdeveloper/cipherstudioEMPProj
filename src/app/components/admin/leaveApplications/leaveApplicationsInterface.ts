export interface leaveApplicationsInterface {
    leaveHistory: {
        id: string;
        leaveType: string;
        startDate: string;
        endDate: string;
        reason: string;
        status: string;
        userName: string;
    }[];
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    userName: string;
    id: string;
    approveApplication: (e: any) => void;
    rejectApplication: (e: any) => void;
}