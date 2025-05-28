import { Injectable } from '@nestjs/common';
import { Items } from './entities/items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Items)
    private readonly itemRepository: Repository<Items>,
  ) {}

  async createItem(itemDto: AddItemDto): Promise<Items> {
    return this.itemRepository.save(itemDto);
  }

  getAllItems(): Promise<Items[]> {
    return this.itemRepository.find();
  }

  async findByCategory(category: string, sex: string) {
    return this.itemRepository.find({
      where: {
        category,
        sex,
      },
    });
  }

  async findByBrand(brand: string) {
    return this.itemRepository.find({
      where: {
        brand,
      },
    });
  }
}
