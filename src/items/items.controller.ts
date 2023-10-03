import { Body, Controller, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { TransformInterceptor } from 'src/public/interceptors/transform.interceptor';
import { CreateItemRequestDto, CreateItemResponseDto } from './dto/create-item.dto';

@ApiTags("Items")
@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService : ItemsService){}

    @Post()
    @UseInterceptors(new TransformInterceptor(CreateItemResponseDto))
    @ApiOkResponse({ type: CreateItemResponseDto })
    create(@Body() createItemDto: CreateItemRequestDto) {
        return this.itemsService.create(createItemDto);
  }
    @Get("/hello")
    getMessage(){
        return this.itemsService.getHello();
        }

    @Get("/all")
    writeAll(){
        return this.itemsService.writeAll();
    }
}
