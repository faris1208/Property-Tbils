import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles, UserRole } from '../../common/decorators/roles.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Public()
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.blogService.findAll(page, limit);
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreatePostDto, @CurrentUser() user: User) {
    return this.blogService.create(dto, user);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreatePostDto>) {
    return this.blogService.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
