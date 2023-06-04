export interface RegisterUserDto {
    username: string;
    password: string;
    authStrat?: string;
}

export interface EditUserDto {
    username?: string;
    password?: string;
    authStrat?: string;
}
