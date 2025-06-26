// Data Validation
import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';
export class RegisterDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    emailid: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    pwd: string;

    @IsNotEmpty()
    @IsString()
    phno: string;

}