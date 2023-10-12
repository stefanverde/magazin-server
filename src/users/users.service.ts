import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import passport from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    const foundUser = await this.findByEmail(createUserDto.email);

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const hashedUser = { ...createUserDto, password: hash };
    return this.userRepo.save(hashedUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto);

    return this.findOne(id);
  }

  async delete(id: string) {
    return this.userRepo.delete(id);
  }

  async updatePassword(id: string, data: UpdateUserDto) {
    const hash = await bcrypt.hash(data.password, 10);

    await this.userRepo.update(id, {
      password: hash,
    });

    return this.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  getHello() {
    return 'hello';
  }
  writeAll() {
    return this.userRepo.find();
  }
}
