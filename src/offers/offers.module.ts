import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import {Offer} from "./entities/offer.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersService} from "../users/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer])
  ],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService]
})
export class OffersModule {}
