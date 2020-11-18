import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto{
    
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    username: string
}
