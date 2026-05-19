import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entities/user.entity';
export declare class BlogService {
    private postsRepo;
    constructor(postsRepo: Repository<BlogPost>);
    create(dto: CreatePostDto, author: User): Promise<BlogPost>;
    findAll(page?: number, limit?: number): Promise<{
        success: boolean;
        data: BlogPost[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findBySlug(slug: string): Promise<BlogPost>;
    update(id: string, dto: Partial<CreatePostDto>): Promise<BlogPost | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
