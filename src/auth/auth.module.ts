import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { JwtStratagy } from './jwt.stratagy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'hummus',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    PassportModule.register({ defaultStrategy : "jwt"})
  ],
  providers: [AuthService, JwtStratagy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStratagy]
})
export class AuthModule {}
