import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BcryptService } from 'nest-bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findMany(query: string) {
    return await this.usersRepository.findOne({
      where: [{ email: query }, { username: query }],
    });
  }

  async findUser(query: string) {
    const user = await this.usersRepository.findOne({
      where: [{ username: query }, { email: query }],
    });
    return [user];
  }

  async update(id: number, createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      const { password } = createUserDto;
      const hash = await this.bcryptService.hash(password, 10);
      await this.usersRepository.update(id, {
        ...createUserDto,
        password: hash,
      });
    } else {
      await this.usersRepository.update(id, {
        updatedAt: new Date(),
        ...createUserDto,
      });
    }

    return await this.findById(id);
  }
}
