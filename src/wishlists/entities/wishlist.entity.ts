import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {IsUrl, Length} from 'class-validator';
import {User} from "../../users/entities/user.entity";

@Entity()
export class Wishlist {
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
    @Length(0, 2500)
    description: string;

    @Column()
    @IsUrl()
    image: string;

    //связать с wish
    @Column()
    items: string;

    @ManyToOne(() => User, (user) => user.wishlists)
    owner: User;
}
