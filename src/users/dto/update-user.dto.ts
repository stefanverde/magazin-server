import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserRequestDto } from './create-user-request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserRequestDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token?: string;
}
