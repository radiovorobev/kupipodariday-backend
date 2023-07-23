import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private usersService: UsersService,) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
