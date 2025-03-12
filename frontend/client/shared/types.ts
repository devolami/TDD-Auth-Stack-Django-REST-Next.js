export type User = {
    first_name: string;
    last_name: string;
    email: string;
}

export type SocialAuthArgs ={
    provider: string;
    state: string;
    code: string;
}

export type CreateUserResponse = {
    success: boolean;
    user: User;
}
