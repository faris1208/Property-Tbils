import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, Not, IsNull } from 'typeorm';
import slugify from 'slugify';
import { BlogPost } from './entities/blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogPost) private postsRepo: Repository<BlogPost>) {}

  async create(dto: CreatePostDto, author: User) {
    const slug = `${slugify(dto.title, { lower: true, strict: true })}-${Date.now()}`;
    const post = this.postsRepo.create({
      ...dto,
      slug,
      authorId: author.id,
      publishedAt: new Date(),
    });
    return this.postsRepo.save(post);
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.postsRepo.findAndCount({
      where: { publishedAt: LessThanOrEqual(new Date()) },
      order: { publishedAt: 'DESC' },
      relations: ['author'],
      skip,
      take: limit,
    });
    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const post = await this.postsRepo.findOne({
      where: { slug },
      relations: ['author'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, dto: Partial<CreatePostDto>) {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    await this.postsRepo.update(id, dto);
    return this.postsRepo.findOne({ where: { id }, relations: ['author'] });
  }

  async remove(id: string) {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    await this.postsRepo.delete(id);
    return { message: 'Post deleted' };
  }
}
