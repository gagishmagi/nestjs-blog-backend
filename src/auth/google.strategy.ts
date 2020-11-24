import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google') {
    constructor(){
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        });
    }

    async validate( request: any, accessToken: string, refreshToken: string, profile, done: Function){
        try {
            console.log(profile)
            done(null, profile)
        } catch (err) {
            done(null,false)
        }
    }
}
