import { IsEmail } from 'class-validator';

export class RegisterUserDto {
    username: string;
    password: string;

    @IsEmail()
    email: string;

    authStrat?: string;
}

export interface EditUserDto {
    username?: string;
    password?: string;
    email?: string;
    authStrat?: string;
}
