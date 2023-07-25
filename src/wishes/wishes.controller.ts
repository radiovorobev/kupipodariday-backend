import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createWish(@Body() body, @Req() req) {
    const wish = await this.wishesService.create(body, req.user);
    return wish;
  }

  @Get('/last')
  async findLast() {
    const wishes = await this.wishesService.findLast();
    if (!wishes) {
      throw new NotFoundException('Wishes not found');
    }
    return wishes;
  }

  @Get('/top')
  async findTop() {
    const wishes = await this.wishesService.findTop();
    if (!wishes) {
      throw new NotFoundException('Wishes not found');
    }
    return wishes;
  }
  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }
}
