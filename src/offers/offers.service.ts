import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { WishesService } from '../wishes/wishes.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const { itemId, hidden, amount } = createOfferDto;
    const wish = await this.wishesService.findById(itemId);
    if (wish.owner.id === user.id) {
      throw new BadRequestException('You cant give money for your own wishes');
    } else if (wish.raised + amount > wish.price) {
      throw new BadRequestException('You cant give more than full price');
    }

    const offer = this.offerRepository.create({
      amount,
      hidden,
      item: wish,
      user,
    });

    await this.wishesService.updateRaised(wish, amount);

    return this.offerRepository.save(offer);
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOne({
      relations: {
        user: true,
        item: true,
      },
      where: { id },
    });
    return offer;
  }

  async findAll() {
    const offers = await this.offerRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
    return offers;
  }
}
