import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
export declare class SubscribersService {
    private repo;
    constructor(repo: Repository<Subscriber>);
    subscribe(dto: CreateSubscriberDto): Promise<{
        message: string;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: Subscriber[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
