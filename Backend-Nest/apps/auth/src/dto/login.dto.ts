// Data Validation
import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

export class LoginDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    emailid: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    pwd: string;

}