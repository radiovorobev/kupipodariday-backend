import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {IsUrl} from "class-validator";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //связать с users
    @Column()
    user: string;

    @Column()
    @IsUrl()
    item: string;

    @Column()
    amount: number;

    @Column({
        default: false,
    })
    hidden: boolean;
}
