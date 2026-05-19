import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { MediaService } from '../media/media.service';
export declare class UsersService {
    private usersRepo;
    private mediaService;
    constructor(usersRepo: Repository<User>, mediaService: MediaService);
    getMe(userId: string): Promise<User>;
    updateMe(userId: string, dto: UpdateUserDto): Promise<User>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        avatarUrl: string;
    }>;
}
