// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
  
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:  configService.get<string>('GMAIL_USER'),
        pass:  configService.get<string>('GMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(recipientEmail: string, otp: string): Promise<string> {
    const mailConfig = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: recipientEmail,
      subject: 'LINKEDIN CLONE - Recover your password',
      html: `<!DOCTYPE html>
      <!-- ... (Your HTML content) ... -->
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <!-- ... (Your HTML content continues) ... -->
      `,
    };

    try {
      await this.transporter.sendMail(mailConfig);
      return 'Email sent successfully';
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send email');
    }
  }
}
