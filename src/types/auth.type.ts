export interface LoginResponse {
    success: boolean;
    token?: string;
}

export interface RegisterResponse {
    success: boolean
}

export enum AuthMode {
    Login = 'login',
    Register = 'register',
    Forgot = 'forgot'
} 

export interface AuthTab {
    label: string;
    mode: AuthMode;
}

export interface Feature { 
    title: string;
    desc:string;
}