import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles, UserRole } from '../../common/decorators/roles.decorator';

@Controller('subscribers')
export class SubscribersController {
  constructor(private service: SubscribersService) {}

  @Public()
  @Post()
  subscribe(@Body() dto: CreateSubscriberDto) {
    return this.service.subscribe(dto);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.service.findAll(page, limit);
  }
}
