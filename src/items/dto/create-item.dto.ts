import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

}

@Exclude()
export class CreateItemResponseDto {
  @Expose()
  @ApiProperty()
  name: string;
  

  @Expose()
  @ApiProperty()
  id: string;
}
