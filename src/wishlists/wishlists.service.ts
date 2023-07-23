import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Wishlist} from "./entities/wishlist.entity";

@Injectable()
export class WishlistsService {

  constructor(
      @InjectRepository(Wishlist)
      private readonly wishlistRepository: Repository<Wishlist>,
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    const newWishlist = this.wishlistRepository.create(createWishlistDto);
    return this.wishlistRepository.save(newWishlist);
  }

  findAll() {
    return this.wishlistRepository.find();
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    Object.assign(wishlist, updateWishlistDto);

    return this.wishlistRepository.save(wishlist);
  }

  async remove(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    await this.wishlistRepository.remove(wishlist);
  }
}
