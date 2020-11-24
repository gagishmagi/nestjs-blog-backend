import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/db/entities/user";

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy){

    constructor( @InjectRepository(User) private userRepo: Repository<User> ){
        super({
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: process.env.SECRET
        });
    }


    async validate(payload : any){
        const { username } =  payload;
        const user = this.userRepo.find({where: {username} });
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}
