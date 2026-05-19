import { Controller, Post, Delete, Get, Param, Query } from '@nestjs/common';
import { SavedService } from './saved.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('saved')
export class SavedController {
  constructor(private savedService: SavedService) {}

  @Post(':propertyId')
  save(@CurrentUser('id') userId: string, @Param('propertyId') propertyId: string) {
    return this.savedService.save(userId, propertyId);
  }

  @Delete(':propertyId')
  unsave(@CurrentUser('id') userId: string, @Param('propertyId') propertyId: string) {
    return this.savedService.unsave(userId, propertyId);
  }

  @Get()
  getMySaved(
    @CurrentUser('id') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.savedService.getMySaved(userId, page, limit);
  }
}
