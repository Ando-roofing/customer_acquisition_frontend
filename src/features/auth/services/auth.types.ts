export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}