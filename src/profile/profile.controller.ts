import { Controller, Get, Param, UseGuards, Body, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/db/entities/user';
import { ProfileResponse } from 'src/models/user.model';
import { Profile } from 'passport';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {


    constructor(private userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get(':username')
    async findProfile(@Param('username') username: string, @Body() user: User) {
        const profile = await this.userService.findByUsername(username,user)
        
        if(!profile){
            throw new NotFoundException()
        }

        return { profile }

    }
}
