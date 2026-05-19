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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedController = void 0;
const common_1 = require("@nestjs/common");
const saved_service_1 = require("./saved.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let SavedController = class SavedController {
    savedService;
    constructor(savedService) {
        this.savedService = savedService;
    }
    save(userId, propertyId) {
        return this.savedService.save(userId, propertyId);
    }
    unsave(userId, propertyId) {
        return this.savedService.unsave(userId, propertyId);
    }
    getMySaved(userId, page, limit) {
        return this.savedService.getMySaved(userId, page, limit);
    }
};
exports.SavedController = SavedController;
__decorate([
    (0, common_1.Post)(':propertyId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "save", null);
__decorate([
    (0, common_1.Delete)(':propertyId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "unsave", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "getMySaved", null);
exports.SavedController = SavedController = __decorate([
    (0, common_1.Controller)('saved'),
    __metadata("design:paramtypes", [saved_service_1.SavedService])
], SavedController);
//# sourceMappingURL=saved.controller.js.map