import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Offer} from "./entities/offer.entity";

@Injectable()
export class OffersService {
  constructor(
      @InjectRepository(Offer)
      private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    const newOffer = this.offerRepository.create(createOfferDto);
    return this.offerRepository.save(newOffer);
  }

  findAll() {
    return this.offerRepository.find();
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOne({
      where: { id },
    });
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    const offer = await this.offerRepository.findOne({
      where: { id },
    });
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    Object.assign(offer, updateOfferDto);

    return this.offerRepository.save(offer);
  }

  async remove(id: number) {
    const offer = await this.offerRepository.findOne({
      where: { id },
    });
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    await this.offerRepository.remove(offer);
  }
}
