import { Entity, BaseEntity, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { bcrypt } from 'bcrypt';
import { IsEmail } from "class-validator";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    @IsEmail()
    email: string

    @Column({unique: true})
    username: string

    @Column({default: ''})
    bio: string

    @Column({default: null, nullable: true})
    image: string | null

    @Column({select:false})
    password: string


    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    update: Date


    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password)
    }

    async comparePassword(attept: string){
        return await bcrypt.compare(attept, this.password)
    }
}
