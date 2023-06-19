export interface CreateAccountData {
    full_name: string,
    email: string,
    phone?: string,
    telegram?: string
}

export interface OTPData {
    email: string;
    phone?: string;
    type?: string;
}

export interface LoginAccountData {
    session_key: string;
    otp: string;
}

export interface AuthSessionData {
    token: string;
    id: string;
}