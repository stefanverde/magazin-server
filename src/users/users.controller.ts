import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/by-email/:email')
  async getByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  @Get('/details/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Put('/update-password')
  async updatePassword(
    @Body() body: UpdateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    console.log(body);

    return this.usersService.updatePassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteUser/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
