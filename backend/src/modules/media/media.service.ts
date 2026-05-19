import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

@Injectable()
export class MediaService {
  constructor(config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
  }

  async upload(file: Express.Multer.File, folder = 'properties') {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Allowed: jpeg, png, webp, mp4');
    }
    if (file.size > MAX_SIZE) {
      throw new BadRequestException('File too large. Max size is 10MB');
    }

    return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: `property-tbils/${folder}` }, (error, result) => {
          if (error || !result) return reject(new BadRequestException(error?.message ?? 'Upload failed'));
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        })
        .end(file.buffer);
    });
  }

  async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
