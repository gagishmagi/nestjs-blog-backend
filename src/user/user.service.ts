import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/models/update.user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findByUsername(username: string): Promise<User>{
        return await this.userRepo.findOne({where: { username } })
    }

    async findByEmail(email: string): Promise<User>{
        return await this.userRepo.findOne({where: { email} })
    }

    async updateUser(email: string , data: UpdateUserDto){
        await this.userRepo.update({email}, data)

    }
}
