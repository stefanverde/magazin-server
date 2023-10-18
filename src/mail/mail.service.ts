import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { secretKey } from 'src/config';
@Injectable()
export class MailService {
  
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {
    
  }

  async sendMail(email: string): Promise<void> {

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      console.log('User not found');
      return;
    }

    let token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '10m',
    });

    token = encodeURI(token);

    // console.log({ link: `http://localhost:3000/resetPassword?token=${token}` });

    await this.mailerService.sendMail({
      to: user.email,
      from: 'admin@gmail.com',
      subject: 'Password Reset',
      html: `
      <p>Click this <a href='http://localhost:3000/resetPassword?token=${token}'>link</a> to reset your password
      </p>`,
    });
  }
}
