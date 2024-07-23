export interface TasksFormInterface {
    dataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formdata: {
        id:any;
        projectName: string;
        title: string;
        description: string;
        status: string;
        estimatedTime: string;
        timeTaken: string;
    };
    isModal: boolean;
    handleClose: () => void;
    loading: boolean;
}
