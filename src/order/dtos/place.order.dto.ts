import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  pretTotal: number;

  @IsNotEmpty()
  @IsArray()
  items: any[];
}
