export interface RulesForCalendarProps {
    activeTab: string | null;
    setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    allRules: any;
    deleteSelected:(user: any) => void;
    handleDeleteConfirmation:(user: any) => void;
    cancelDeleteRule:(user: any) => void;
    isDeleteConfirmationVisible:boolean;
    selectedRuleId: string;    
    onupdate:()=>void;
}