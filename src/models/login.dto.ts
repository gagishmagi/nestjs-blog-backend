import { IsEmail, IsString, MinLength, IsAlphanumeric, MaxLength } from 'class-validator'


export class LoginDto {
    
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsAlphanumeric()
    password: string
}
