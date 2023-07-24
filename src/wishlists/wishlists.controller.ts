import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body, @Req() req) {
    return await this.wishlistsService.create(body, req.user);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getWishlist(@Param('id') id) {
    return await this.wishlistsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  async updateWishlist(@Param('id') id, @Body() body, @Req() req) {
    return await this.wishlistsService.update(id, body, req.user);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteWishlist(@Param('id') id, @Req() req) {
    return await this.wishlistsService.remove(id, req.user);
  }
}
