import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WishesService } from '../wishes/wishes.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  me(@Req() req) {
    const { id } = req.user;
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/:username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.findMany(username);
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async getMyWishes(@Req() req) {
    const { id } = req.user;
    return await this.wishesService.findMyWishes(id);
  }

  @UseGuards(JwtGuard)
  @Post('find')
  async findMany(@Body() body: { query: string }) {
    return await this.usersService.findMany(body.query);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateUser(@Req() req, @Body() body) {
    const user = await this.usersService.update(req.user.id, { ...body });
    return user;
  }
}
