import { ConfigService } from '@nestjs/config';
export declare class MediaService {
    constructor(config: ConfigService);
    upload(file: Express.Multer.File, folder?: string): Promise<{
        secure_url: string;
        public_id: string;
    }>;
    delete(publicId: string): Promise<any>;
}
