import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { JwtStratagy } from './jwt.stratagy';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(), 
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    }),
    PassportModule.register({ defaultStrategy : "jwt" })
  ],
  providers: [AuthService, JwtStratagy, GoogleStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStratagy] 
})
export class AuthModule {}
