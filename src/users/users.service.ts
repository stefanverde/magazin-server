import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    //register
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

  // async updatePassword(id: string, data: UpdateUserDto) {
  //   const hash = await bcrypt.hash(data.password, 10);

  //   await this.userRepo.update(id, {
  //     password: hash,
  //   });

  //   return this.findOne(id);
  // }
  async updatePassword(token: string, data: UpdateUserDto): Promise<string> {
    try {
      const decodedToken = jwt.verify(decodeURI(token), 'secret-key');
      const userId = decodedToken['userId'];

      const user = await this.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hash = await bcrypt.hash(data.password, 10);
      await this.userRepo.update(userId, {
        password: hash,
      });

      return 'Password updated successfully!';
    } catch (error) {
      throw new UnauthorizedException('User not found or token expired');
    }
  }

  findByEmail(email: string) {
    if (!email) {
      return;
    }

    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }
}
