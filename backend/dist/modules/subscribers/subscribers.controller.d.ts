import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
export declare class SubscribersController {
    private service;
    constructor(service: SubscribersService);
    subscribe(dto: CreateSubscriberDto): Promise<{
        message: string;
    }>;
    findAll(page: number, limit: number): Promise<{
        data: import("./entities/subscriber.entity").Subscriber[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
