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
exports.Agent = exports.AgentTier = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
var AgentTier;
(function (AgentTier) {
    AgentTier["FREE"] = "free";
    AgentTier["PRO"] = "pro";
    AgentTier["PREMIUM"] = "premium";
})(AgentTier || (exports.AgentTier = AgentTier = {}));
let Agent = class Agent {
    id;
    userId;
    user;
    agencyName;
    bio;
    whatsapp;
    phone;
    isVerified;
    tier;
    createdAt;
    updatedAt;
};
exports.Agent = Agent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Agent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', unique: true }),
    __metadata("design:type", String)
], Agent.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Agent.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agency_name', nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "agencyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_verified', default: false }),
    __metadata("design:type", Boolean)
], Agent.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AgentTier, default: AgentTier.FREE }),
    __metadata("design:type", String)
], Agent.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Agent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Agent.prototype, "updatedAt", void 0);
exports.Agent = Agent = __decorate([
    (0, typeorm_1.Entity)('agents')
], Agent);
//# sourceMappingURL=agent.entity.js.map