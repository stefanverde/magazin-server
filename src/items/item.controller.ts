import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddItemDto } from './dto/item.dto';
import { ItemService } from './item.service';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/addItem')
  @ApiOkResponse({ type: AddItemDto })
  create(@Body() itemDto: AddItemDto) {
    return this.itemService.createItem(itemDto);
  }

  @Get('/getItems')
  getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get('/category/:category/:sex')
  async getByCategory(
    @Param('category') category: string,
    @Param('sex') sex: string,
  ) {
    return await this.itemService.findByCategory(category, sex);
  }

  @Get('/brand/:brand')
  async getByBrand(@Param('brand') brand: string) {
    return await this.itemService.findByBrand(brand);
  }
}
