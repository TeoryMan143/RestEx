import { IsEmail } from '@nestjs/class-validator';

export class RegisterUserDto {
    username: string;
    password: string;

    @IsEmail({})
    email: string;
    authStrat?: string;
}

export class EditUserDto {
    username?: string;
    password?: string;

    @IsEmail()
    email?: string;
    authStrat?: string;
}
