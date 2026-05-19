import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto, CreateInspectionDto } from './dto/create-lead.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles, UserRole } from '../../common/decorators/roles.decorator';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Public()
  @Post()
  submitInquiry(@Body() dto: CreateLeadDto) {
    return this.leadsService.submitInquiry(dto);
  }

  @Public()
  @Post('inspection')
  scheduleInspection(@Body() dto: CreateInspectionDto) {
    return this.leadsService.scheduleInspection(dto);
  }

  @Roles(UserRole.AGENT, UserRole.ADMIN)
  @Get()
  getMyLeads(
    @CurrentUser('id') agentId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.leadsService.getMyLeads(agentId, page, limit);
  }
}
