import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @UseGuards(JwtGuard)
  @Post()
  async createOffer(@Body() body: CreateOfferDto, @Req() req) {
    const offer = await this.offersService.create(body, req.user);
    return offer;
  }

  @UseGuards(JwtGuard)
  @Get()
  async getOffers() {
    const offers = await this.offersService.findAll();
    return offers;
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getOffer(@Param('id') id) {
    const offer = await this.offersService.findOne(id);
    return offer;
  }
}
