import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
@Injectable()
export class MailService {
  private secretKey: string;
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {
    this.secretKey = crypto.randomBytes(32).toString('hex');
  }

  async sendMail(dbEmail: string): Promise<void> {
    const user = await this.usersService.findByEmail(dbEmail);
    console.log(user);
    // const resetToken = generateResetToken();
    const token = jwt.sign({ userId: user.id }, this.secretKey, {
      expiresIn: '10m',
    });
    await this.mailerService.sendMail({
      to: dbEmail,
      from: 'admin@gmail.com',
      subject: 'password Reset',
      html: `
      <p>Click this <a href='http://localhost:3000/resetPassword/${token}'>link</a> to reset your password
        
      </p>`,
    });
  }
}
