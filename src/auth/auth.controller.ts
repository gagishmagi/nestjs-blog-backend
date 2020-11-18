import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/models/register.dto';
import { LoginDto } from 'src/models/login.dto';

@Controller('users')
export class AuthController {
    constructor( private authService: AuthService){}


    @Post()
    register(@Body(ValidationPipe) credentials:RegisterDto){
        return this.authService.register(credentials)
    }


    @Post('/login')
    login(@Body(ValidationPipe) credentials:LoginDto){
        return this.authService.login(credentials);
    }
}
