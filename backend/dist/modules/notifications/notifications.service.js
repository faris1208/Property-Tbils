"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
function esc(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
let NotificationsService = NotificationsService_1 = class NotificationsService {
    config;
    transporter;
    logger = new common_1.Logger(NotificationsService_1.name);
    from = 'Property TBILS <verify@tbils.com>';
    constructor(config) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            host: config.get('SMTP_HOST'),
            port: config.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: config.get('SMTP_USER'),
                pass: config.get('SMTP_PASS'),
            },
        });
    }
    async sendEmail(to, subject, html) {
        try {
            await this.transporter.sendMail({ from: this.from, to, subject, html });
        }
        catch (err) {
            this.logger.error(`Failed to send email to ${to}: ${err.message}`);
        }
    }
    async sendWelcomeEmail(to, firstName) {
        await this.sendEmail(to, 'Welcome to Property TBILS', `<h2>Welcome, ${esc(firstName)}!</h2>
       <p>Your email has been verified. You can now explore thousands of properties across Nigeria.</p>
       <p><a href="${this.config.get('FRONTEND_URL')}">Browse Properties</a></p>`);
    }
    async sendVerificationEmail(to, firstName, otp) {
        await this.sendEmail(to, 'Email Verification Code', `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
       <h2 style="color:#1e293b">Tbils Property</h2>
       <p>Hi ${esc(firstName)}, your verification code is:</p>
       <p style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#2563eb">${esc(otp)}</p>
       <p style="color:#64748b">This code expires in 10 minutes.</p>
       </div>`);
    }
    async sendNewLeadEmail(agentEmail, agentName, propertyTitle, leadName, leadEmail, leadPhone, message) {
        await this.sendEmail(agentEmail, `New inquiry for: ${esc(propertyTitle)}`, `<h2>New Inquiry, ${esc(agentName)}</h2>
       <p><strong>Property:</strong> ${esc(propertyTitle)}</p>
       <p><strong>From:</strong> ${esc(leadName)}</p>
       <p><strong>Email:</strong> ${esc(leadEmail)}</p>
       <p><strong>Phone:</strong> ${esc(leadPhone)}</p>
       <p><strong>Message:</strong> ${esc(message)}</p>`);
    }
    async sendInquiryConfirmationEmail(to, name, propertyTitle) {
        await this.sendEmail(to, 'We received your inquiry — Property TBILS', `<h2>Hi ${esc(name)},</h2>
       <p>Thanks for your inquiry about <strong>${esc(propertyTitle)}</strong>.</p>
       <p>The agent will get back to you shortly.</p>`);
    }
    async sendPropertyApprovedEmail(to, agentName, propertyTitle) {
        await this.sendEmail(to, 'Your listing has been approved — Property TBILS', `<h2>Great news, ${esc(agentName)}!</h2>
       <p>Your listing <strong>${esc(propertyTitle)}</strong> has been approved and is now live.</p>
       <p><a href="${this.config.get('FRONTEND_URL')}/properties">View Listings</a></p>`);
    }
    async sendPasswordResetEmail(to, firstName, resetUrl) {
        await this.sendEmail(to, 'Reset your password — Property TBILS', `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
       <h2 style="color:#1e293b">Property TBILS</h2>
       <p>Hi ${esc(firstName)}, we received a request to reset your password.</p>
       <p style="margin:24px 0">
         <a href="${resetUrl}" style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
           Reset Password
         </a>
       </p>
       <p style="color:#64748b;font-size:14px">This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
       </div>`);
    }
    async sendPropertyRejectedEmail(to, agentName, propertyTitle, reason) {
        await this.sendEmail(to, 'Your listing was not approved — Property TBILS', `<h2>Hi ${esc(agentName)},</h2>
       <p>Unfortunately your listing <strong>${esc(propertyTitle)}</strong> was not approved.</p>
       <p><strong>Reason:</strong> ${esc(reason)}</p>
       <p>Please update your listing and resubmit.</p>`);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map