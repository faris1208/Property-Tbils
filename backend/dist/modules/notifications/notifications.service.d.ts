import { ConfigService } from '@nestjs/config';
export declare class NotificationsService {
    private config;
    private transporter;
    private readonly logger;
    private readonly from;
    constructor(config: ConfigService);
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    sendWelcomeEmail(to: string, firstName: string): Promise<void>;
    sendVerificationEmail(to: string, firstName: string, otp: string): Promise<void>;
    sendNewLeadEmail(agentEmail: string, agentName: string, propertyTitle: string, leadName: string, leadEmail: string, leadPhone: string, message: string): Promise<void>;
    sendInquiryConfirmationEmail(to: string, name: string, propertyTitle: string): Promise<void>;
    sendPropertyApprovedEmail(to: string, agentName: string, propertyTitle: string): Promise<void>;
    sendPasswordResetEmail(to: string, firstName: string, resetUrl: string): Promise<void>;
    sendPropertyRejectedEmail(to: string, agentName: string, propertyTitle: string, reason: string): Promise<void>;
}
