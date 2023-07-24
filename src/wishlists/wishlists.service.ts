import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, owner: User) {
    const items = await Promise.all(
      createWishlistDto.itemsId.map(async (id) => {
        return await this.wishesService.findById(Number(id));
      }),
    );
    const newWishlist = await this.wishlistRepository.create({
      ...createWishlistDto,
      owner,
      items,
    });
    return await this.wishlistRepository.save(newWishlist);
  }

  async findAll() {
    const wishLists = await this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
    return wishLists;
  }

  async findOne(id: number) {
    return await this.wishlistRepository.findOne({
      relations: {
        owner: true,
        items: true,
      },
      where: { id },
    });
  }

  async remove(id: number, owner: User) {
    const wishList = await this.findOne(id);
    if (wishList.owner.id !== owner.id) {
      throw new BadRequestException('You are not the owner of this list');
    }
    await this.wishlistRepository.delete({ id });
    return { message: 'Deleted' };
  }

  async update(id: number, createWishDto: CreateWishlistDto, owner: User) {
    let wishlist = await this.findOne(id);
    if (wishlist.owner.id !== owner.id) {
      throw new BadRequestException('You are not the owner of this list');
    }

    const items = await Promise.all(
      createWishDto.itemsId.map(async (id) => {
        return await this.wishesService.findById(Number(id));
      }),
    );
    await this.wishlistRepository.update(id, {
      updatedAt: new Date(),
      ...createWishDto,
      items,
    });
    wishlist = await this.findOne(id);
    return wishlist;
  }
}
