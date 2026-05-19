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
exports.PropertyAmenity = void 0;
const typeorm_1 = require("typeorm");
const property_entity_1 = require("./property.entity");
let PropertyAmenity = class PropertyAmenity {
    id;
    propertyId;
    property;
    amenity;
};
exports.PropertyAmenity = PropertyAmenity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PropertyAmenity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id' }),
    __metadata("design:type", String)
], PropertyAmenity.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (p) => p.amenities, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], PropertyAmenity.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PropertyAmenity.prototype, "amenity", void 0);
exports.PropertyAmenity = PropertyAmenity = __decorate([
    (0, typeorm_1.Entity)('property_amenities')
], PropertyAmenity);
//# sourceMappingURL=property-amenity.entity.js.map