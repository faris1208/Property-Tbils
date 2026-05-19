import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entities/user.entity';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    findAll(page: number, limit: number): Promise<{
        success: boolean;
        data: import("./entities/blog-post.entity").BlogPost[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findBySlug(slug: string): Promise<import("./entities/blog-post.entity").BlogPost>;
    create(dto: CreatePostDto, user: User): Promise<import("./entities/blog-post.entity").BlogPost>;
    update(id: string, dto: Partial<CreatePostDto>): Promise<import("./entities/blog-post.entity").BlogPost | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
