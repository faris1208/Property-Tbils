"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
const MAX_SIZE = 10 * 1024 * 1024;
let MediaService = class MediaService {
    constructor(config) {
        cloudinary_1.v2.config({
            cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: config.get('CLOUDINARY_API_KEY'),
            api_secret: config.get('CLOUDINARY_API_SECRET'),
        });
    }
    async upload(file, folder = 'properties') {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Allowed: jpeg, png, webp, mp4');
        }
        if (file.size > MAX_SIZE) {
            throw new common_1.BadRequestException('File too large. Max size is 10MB');
        }
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({ folder: `property-tbils/${folder}` }, (error, result) => {
                if (error || !result)
                    return reject(new common_1.BadRequestException(error?.message ?? 'Upload failed'));
                resolve({ secure_url: result.secure_url, public_id: result.public_id });
            })
                .end(file.buffer);
        });
    }
    async delete(publicId) {
        return cloudinary_1.v2.uploader.destroy(publicId);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MediaService);
//# sourceMappingURL=media.service.js.map