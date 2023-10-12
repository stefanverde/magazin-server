import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  async sendMail(dbEmail: string): Promise<void> {
    const user = await this.usersService.findByEmail(dbEmail);
    await this.mailerService.sendMail({
      to: dbEmail,
      from: 'verdestefan87@gmail.com',
      subject: 'password Reset',
      html: `
      <p>Click this <a href='http://localhost:3000/resetPassword/${user.id}'>link</a> to reset your password
        
      </p>`,
    });
  }
}
