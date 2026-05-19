import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { MediaService } from '../media/media.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private mediaService: MediaService,
  ) {}

  async getMe(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    await this.usersRepo.update(userId, dto);
    return this.getMe(userId);
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    const result = await this.mediaService.upload(file, 'avatars');
    await this.usersRepo.update(userId, { avatarUrl: result.secure_url });
    return { avatarUrl: result.secure_url };
  }
}
