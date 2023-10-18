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

  @Post('register')
  @UseInterceptors(new TransformInterceptor(CreateUserResponseDto))
  @ApiOkResponse({ type: CreateUserResponseDto })
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

  @Put('/update-password')
  async updatePassword(
    @Query('token') token: string,
    @Body() data: UpdateUserDto,
  ): Promise<string> {
    return this.usersService.updatePassword(token, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteUser/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
