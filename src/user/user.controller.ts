import { Controller, Get, Body, Put, ValidationPipe } from '@nestjs/common';
import { User } from 'src/db/entities/user';
import { UserService } from './user.service';
import e from 'express';
import { UpdateUserDto } from 'src/models/update.user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    findCurrentUser(@Body('username', ValidationPipe) username: string ){
        if(username.includes("@")){
            //username == email
            return this.userService.findByEmail(username)
        }
        else
        //username == username
            return this.userService.findByUsername(username)
    }


    @Put()
    update(@Body('username') username:string , @Body(ValidationPipe) data: UpdateUserDto){
        return this.userService.updateUser(username, data)
    }

}
