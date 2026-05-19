"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const env_validation_1 = require("./config/env.validation");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const media_module_1 = require("./modules/media/media.module");
const properties_module_1 = require("./modules/properties/properties.module");
const agents_module_1 = require("./modules/agents/agents.module");
const leads_module_1 = require("./modules/leads/leads.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const blog_module_1 = require("./modules/blog/blog.module");
const admin_module_1 = require("./modules/admin/admin.module");
const saved_module_1 = require("./modules/saved/saved.module");
const subscribers_module_1 = require("./modules/subscribers/subscribers.module");
const health_module_1 = require("./modules/health/health.module");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: env_validation_1.envValidationSchema,
            }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
                    synchronize: false,
                    ssl: config.get('DATABASE_URL')?.includes('aivencloud.com')
                        ? { rejectUnauthorized: false }
                        : false,
                    extra: { max: 10, min: 2, idleTimeoutMillis: 30000 },
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            media_module_1.MediaModule,
            properties_module_1.PropertiesModule,
            agents_module_1.AgentsModule,
            leads_module_1.LeadsModule,
            notifications_module_1.NotificationsModule,
            blog_module_1.BlogModule,
            admin_module_1.AdminModule,
            saved_module_1.SavedModule,
            subscribers_module_1.SubscribersModule,
            health_module_1.HealthModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map