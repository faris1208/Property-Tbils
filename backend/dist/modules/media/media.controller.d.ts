import { MediaService } from './media.service';
export declare class MediaController {
    private mediaService;
    constructor(mediaService: MediaService);
    upload(file: Express.Multer.File): Promise<{
        secure_url: string;
        public_id: string;
    }>;
}
