export interface SignInInterface {
    onLogin: React.FormEventHandler<HTMLFormElement>;
    onChangeData: React.ChangeEventHandler<HTMLInputElement>;
    formdata: {
        email: string;
        password: string;
    };
    loading: boolean;
    errors: loginErrorType;
    rememberMe:boolean
onRememberMeChange:(e: any) => void
}