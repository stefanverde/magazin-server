import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entity/order.entity';
import { OrderDto } from './dtos/place.order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepo: Repository<Orders>,
  ) {}

  async placeOrder(orderDto: OrderDto): Promise<Orders> {
    const order = this.orderRepo.create({
      items: orderDto.items,
      pretTotal: orderDto.pretTotal,
    });

    return this.orderRepo.save(order);
  }
}
