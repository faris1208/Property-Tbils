import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles, UserRole } from '../../common/decorators/roles.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Public()
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.agentsService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.agentsService.findById(id);
  }

  @Roles(UserRole.AGENT)
  @Post('profile')
  createProfile(@Body() dto: CreateAgentDto, @CurrentUser() user: User) {
    return this.agentsService.createProfile(dto, user);
  }

  @Roles(UserRole.AGENT)
  @Patch('profile')
  updateProfile(@Body() dto: CreateAgentDto, @CurrentUser() user: User) {
    return this.agentsService.updateProfile(dto, user);
  }
}
