import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class registerDto{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

}