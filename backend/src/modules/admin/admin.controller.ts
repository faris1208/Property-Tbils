import { Controller, Get, Patch, Body, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles, UserRole } from '../../common/decorators/roles.decorator';

@Controller('admin')
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('properties/pending')
  getPendingProperties(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getPendingProperties(page, limit);
  }

  @Get('properties/approved')
  getApprovedProperties(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getApprovedProperties(page, limit);
  }

  @Get('properties/rejected')
  getRejectedProperties(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getRejectedProperties(page, limit);
  }

  @Patch('properties/:id/approve')
  approveProperty(@Param('id') id: string) {
    return this.adminService.approveProperty(id);
  }

  @Patch('properties/:id/reject')
  rejectProperty(@Param('id') id: string, @Body('reason') reason: string) {
    return this.adminService.rejectProperty(id, reason);
  }

  @Get('users')
  getAllUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getAllUsers(page, limit);
  }

  @Get('users/buyers')
  getBuyers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getBuyers(page, limit);
  }

  @Get('users/sellers')
  getSellers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getSellers(page, limit);
  }

  @Patch('users/:id/ban')
  banUser(@Param('id') id: string) {
    return this.adminService.banUser(id);
  }

  @Get('leads')
  getAllLeads(@Query('page') page: number, @Query('limit') limit: number) {
    return this.adminService.getAllLeads(page, limit);
  }

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }
}
