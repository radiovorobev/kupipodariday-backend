import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Wish} from "./entities/wish.entity";

@Injectable()
export class WishesService {
  constructor(
      @InjectRepository(Wish)
      private readonly wishRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto) {
    const newWish = this.wishRepository.create(createWishDto);
    return this.wishRepository.save(newWish);
  }

  findAll() {
    return this.wishRepository.find();
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });
    if (!wish) {
      throw new NotFoundException('Wish not found');
    }
    return wish;
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });
    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    Object.assign(wish, updateWishDto);

    return this.wishRepository.save(wish);
  }

  async remove(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });
    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    await this.wishRepository.remove(wish);
  }
}
