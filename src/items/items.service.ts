import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/items.entity';
import { Repository } from 'typeorm';
import { CreateItemRequestDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {

    //here i write classes to implement in controller
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepo: Repository<Item>,
      ) {}
    
      async create(createItemDto: CreateItemRequestDto) {
        const foundItem = await this.findByName(createItemDto.name);
    
        if (foundItem) {
          throw new BadRequestException('Item already exists');
        }
    
        // const hash = await bcrypt.hash(createItemDto.password, 10);
    
        const hashedItem = { ...createItemDto /*here i should have , password: hash */ };
    
        return this.itemsRepo.save(hashedItem);
      }
     findByName(name: string) {
        return this.itemsRepo.findOne({
          where: {
            name,
          },
        });
      }
      writeAll(){
        return this.itemsRepo.find();
      }

     getHello(){
        return "hello";
      }
}
