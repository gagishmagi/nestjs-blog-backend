import { Entity, BaseEntity, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { hash, compare } from 'bcrypt';
import { IsEmail } from "class-validator";
import { classToPlain } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number 

    @IsEmail()
    @Column({unique: true})
    email: string

    @Column({unique: true})
    username: string

    @Column({default: ''})
    bio: string

    @Column({default: null, nullable: true})
    image: string | null

    @Column()
    password: string


    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    update: Date


    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password,10)
    }

    async comparePassword(attept: string){
        console.log(attept)
        console.log(this)
        return await compare(attept, this.password)
    }

    toJSON(){
        return classToPlain(this)
    }

    toProfile(user ? : User){
        let following = null;
        if(user){
            // following = this.followers.includes(user)
        }
        const profile : any = this.toJSON();
        delete profile.followers;
        return {...profile, following}
    }

}
