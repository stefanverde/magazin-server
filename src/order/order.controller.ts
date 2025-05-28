import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/place.order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place-order')
  async place(@Body() orderDto: OrderDto) {
    return this.orderService.placeOrder(orderDto);
  }
}
