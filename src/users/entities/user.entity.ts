import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {IsEmail, IsUrl, Length} from 'class-validator';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        unique: true,
    })
    @Length(2, 30)
    username: string;

    @Column({
        default: 'Пока ничего не рассказал о себе.',
    })
    @Length(2, 200)
    about: string;

    @Column({
        default: 'https://i.pravatar.cc/300',})
    @IsUrl()
    avatar: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    //связать с таблицей wishes
    @Column()
    wishes: string;

    //связать с таблицей offers
    @Column()
    offers: string;

    //связать с таблицей wishlists
    @Column()
    wishlists: string;

}
