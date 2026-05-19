import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(userId: string): Promise<import("../auth/entities/user.entity").User>;
    updateMe(userId: string, dto: UpdateUserDto): Promise<import("../auth/entities/user.entity").User>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        avatarUrl: string;
    }>;
}
