import { User } from '../../auth/entities/user.entity';
export declare class BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    authorId: string;
    author: User;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
