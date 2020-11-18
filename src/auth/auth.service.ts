import { Injectable, HttpException } from '@nestjs/common';
import { RegisterDto } from 'src/models/register.dto';
import { LoginDto } from 'src/models/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    private db = []

    private mockUser = {
        email: 'gagi.shmagi@test.com',
        token: 'my-token',
        username: 'gagi.shmagi',
        bio: 'I am Gagi Shmagi...',
        image: null
    }

    constructor(@InjectRepository(User) private userRepo: Repository<User> , private jwtService: JwtService){}

    login(credentials: LoginDto ) {
        return this.mockUser
    }
    register(credentials: RegisterDto ) {
        if(credentials.email === this.mockUser.email){
            return this.mockUser
        }
        //TODO: REGISTER USER FOR REAL/ADD USER TO DB
        this.db.push(credentials)
        return credentials
        
    }
}
