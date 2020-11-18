import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/db/entities/user";

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy){

    constructor( @InjectRepository(User) private userRepo: Repository<User> ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithSchema('my-token'),
            secretOrKey: 'hummus'
        });
    }

}
