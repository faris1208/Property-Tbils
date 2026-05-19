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
exports.SubscribersController = void 0;
const common_1 = require("@nestjs/common");
const subscribers_service_1 = require("./subscribers.service");
const create_subscriber_dto_1 = require("./dto/create-subscriber.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let SubscribersController = class SubscribersController {
    service;
    constructor(service) {
        this.service = service;
    }
    subscribe(dto) {
        return this.service.subscribe(dto);
    }
    findAll(page, limit) {
        return this.service.findAll(page, limit);
    }
};
exports.SubscribersController = SubscribersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscriber_dto_1.CreateSubscriberDto]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "subscribe", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "findAll", null);
exports.SubscribersController = SubscribersController = __decorate([
    (0, common_1.Controller)('subscribers'),
    __metadata("design:paramtypes", [subscribers_service_1.SubscribersService])
], SubscribersController);
//# sourceMappingURL=subscribers.controller.js.map