import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto, owner: User) {
    const wish = await this.wishRepository.create({
      ...createWishDto,
      owner,
    });

    return this.wishRepository.save(wish);
  }

  async findMyWishes(id: number) {
    return await this.wishRepository.find({
      relations: {
        owner: true,
        offers: { user: true },
      },
      where: { owner: { id } },
    });
  }

  async findLast() {
    return await this.wishRepository.find({
      relations: ['owner'],
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      relations: ['owner'],
      order: {
        copied: 'DESC',
      },
      take: 10,
    });
  }

  findAll() {
    return this.wishRepository.find();
  }

  async findById(id: number) {
    return await this.wishRepository.findOne({
      relations: {
        owner: true,
        offers: { user: true },
      },
      where: { id },
    });
  }

  async findByOwner(id: number) {
    const wishes = await this.wishRepository.find({
      relations: {
        owner: true,
        offers: { user: true },
      },
      where: { owner: { id } },
    });
    return wishes;
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

  async updateRaised(wish: Wish, amount: number) {
    return this.wishRepository.update(
      { id: wish.id },
      { raised: wish.raised + amount },
    );
  }

  async copy(id: number, owner: User) {
    const wish = await this.findById(id);
    await this.wishRepository.update(id, { copied: wish.copied + 1 });
    const copyWish = await this.wishRepository.create({
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
      owner,
    });
    return this.wishRepository.save(copyWish);
  }
}
