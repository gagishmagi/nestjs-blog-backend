import { Injectable, HttpException, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/models/register.dto';
import { LoginDto } from 'src/models/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    // private db = []

    // private mockUser = {
    //     email: 'gagi.shmagi@test.com',
    //     token: 'my-token',
    //     username: 'gagi.shmagi',
    //     bio: 'I am Gagi Shmagi...',
    //     image: null
    // }

    constructor(@InjectRepository(User) private userRepo: Repository<User> , private jwtService: JwtService){}

    async login(credentials: LoginDto ) {
        // return this.mockUser            
        try {
            const user = await this.userRepo.findOne({where : {email: credentials.email} })
            
            const isValid = await user.comparePassword(credentials.password);

            if(!isValid){
                throw new UnauthorizedException('Invalid credentials')
            }
            const payload = {username :user.username}
            const token = this.jwtService.sign(payload)
            
            const { password, ...other } = user

            return {user : { ...other , token}}
            
        } catch (err) {
            
            if(err.code === "23505"){
                throw new  ConflictException(`this user with current username already has token`)
            }
            throw new InternalServerErrorException();
        }
    }
    async register(credentials: RegisterDto ) {
        // if(credentials.email === this.mockUser.email){
        //     return this.mockUser
        // }
        // //TODO: REGISTER USER FOR REAL/ADD USER TO DB
        // this.db.push(credentials)
        // return credentials
        try {
            const user = this.userRepo.create(credentials)            
            const res = await user.save()

            const payload = {username :user.username}
            const token = this.jwtService.sign(payload)
            
            return {user : { ...user, token}}
            

        } catch (err) {
           throw new UnauthorizedException('Invalid credentials')
        }


    }
}
