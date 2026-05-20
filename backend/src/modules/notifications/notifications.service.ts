import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(NotificationsService.name);
  private readonly from = 'Property TBILS <verify@tbils.com>';

  constructor(private config: ConfigService) {
    const smtpPort = config.get<number>('SMTP_PORT') || 587;
    this.transporter = nodemailer.createTransport({
      host: config.get<string>('SMTP_HOST'),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: config.get<string>('SMTP_USER'),
        pass: config.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html });
    } catch (err) {
      this.logger.error(`Failed to send email to ${to}: ${err.message}`);
    }
  }

  async sendWelcomeEmail(to: string, firstName: string) {
    await this.sendEmail(
      to,
      'Welcome to Property TBILS',
      `<h2>Welcome, ${esc(firstName)}!</h2>
       <p>Your email has been verified. You can now explore thousands of properties across Nigeria.</p>
       <p><a href="${this.config.get('FRONTEND_URL')}">Browse Properties</a></p>`,
    );
  }

  async sendVerificationEmail(to: string, firstName: string, otp: string) {
    await this.sendEmail(
      to,
      'Email Verification Code',
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
       <h2 style="color:#1e293b">Tbils Property</h2>
       <p>Hi ${esc(firstName)}, your verification code is:</p>
       <p style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#2563eb">${esc(otp)}</p>
       <p style="color:#64748b">This code expires in 10 minutes.</p>
       </div>`,
    );
  }

  async sendNewLeadEmail(
    agentEmail: string,
    agentName: string,
    propertyTitle: string,
    leadName: string,
    leadEmail: string,
    leadPhone: string,
    message: string,
  ) {
    await this.sendEmail(
      agentEmail,
      `New inquiry for: ${esc(propertyTitle)}`,
      `<h2>New Inquiry, ${esc(agentName)}</h2>
       <p><strong>Property:</strong> ${esc(propertyTitle)}</p>
       <p><strong>From:</strong> ${esc(leadName)}</p>
       <p><strong>Email:</strong> ${esc(leadEmail)}</p>
       <p><strong>Phone:</strong> ${esc(leadPhone)}</p>
       <p><strong>Message:</strong> ${esc(message)}</p>`,
    );
  }

  async sendInquiryConfirmationEmail(to: string, name: string, propertyTitle: string) {
    await this.sendEmail(
      to,
      'We received your inquiry — Property TBILS',
      `<h2>Hi ${esc(name)},</h2>
       <p>Thanks for your inquiry about <strong>${esc(propertyTitle)}</strong>.</p>
       <p>The agent will get back to you shortly.</p>`,
    );
  }

  async sendPropertyApprovedEmail(to: string, agentName: string, propertyTitle: string) {
    await this.sendEmail(
      to,
      'Your listing has been approved — Property TBILS',
      `<h2>Great news, ${esc(agentName)}!</h2>
       <p>Your listing <strong>${esc(propertyTitle)}</strong> has been approved and is now live.</p>
       <p><a href="${this.config.get('FRONTEND_URL')}/properties">View Listings</a></p>`,
    );
  }

  async sendPasswordResetEmail(to: string, firstName: string, resetUrl: string) {
    await this.sendEmail(
      to,
      'Reset your password — Property TBILS',
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
       <h2 style="color:#1e293b">Property TBILS</h2>
       <p>Hi ${esc(firstName)}, we received a request to reset your password.</p>
       <p style="margin:24px 0">
         <a href="${resetUrl}" style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
           Reset Password
         </a>
       </p>
       <p style="color:#64748b;font-size:14px">This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
       </div>`,
    );
  }

  async sendPropertyRejectedEmail(
    to: string,
    agentName: string,
    propertyTitle: string,
    reason: string,
  ) {
    await this.sendEmail(
      to,
      'Your listing was not approved — Property TBILS',
      `<h2>Hi ${esc(agentName)},</h2>
       <p>Unfortunately your listing <strong>${esc(propertyTitle)}</strong> was not approved.</p>
       <p><strong>Reason:</strong> ${esc(reason)}</p>
       <p>Please update your listing and resubmit.</p>`,
    );
  }
}
