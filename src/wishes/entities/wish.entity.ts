import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {IsUrl, Length} from "class-validator";
@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(1, 250)
    name: string;

    @Column()
    @IsUrl()
    link: string;

    @Column()
    @IsUrl()
    image: string;

    @Column()
    price: number;

    @Column()
    raised: number;

    //связать с User
    @Column()
    owner: string;

    @Column()
    @Length(1, 1024)
    description: string;

    //связать с offers
    @Column()
    offers: string;

    @Column()
    copied: number;
}
