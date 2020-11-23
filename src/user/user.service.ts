import { Injectable } from '@nestjs/common';
import { User } from 'src/db/entities/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findByUsername(username: string, user: User) : Promise<User> {
        return (await this.userRepo.findOne({
            where: {username},
            relations: ['followers']
        }))
    }
}
