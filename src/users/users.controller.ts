import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../public/interceptors/transform.interceptor';
import { UsersService } from './users.service';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create-user-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
// import * as crypto from "crypto";
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(new TransformInterceptor(CreateUserResponseDto))
  @ApiOkResponse({ type: CreateUserResponseDto })
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/find-all')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/by-email/:email')
  async getByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);

    // console.log(user);
    return user;
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/details/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() project: UpdateUserDto,
  ) {
    return this.usersService.update(id, project);
  }

  // @Put('/update-password/:id')
  // updatePassword(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() data: UpdateUserDto,
  // ) {
  //   return this.usersService.updatePassword(id, data);
  // }
  @Put('/update-password/:token')
  async updatePassword(
    @Param('token') token: string,
    @Body() data: UpdateUserDto,
  ): Promise<string> {
    try {

      const decodedToken = jwt.verify(token,'secret-key');
      const userId = decodedToken['userId'];

      const user = await this.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.usersService.updatePassword(userId, data);

      return 'Password updated successfully!';
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteUser/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
