import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendMail')
  async sendMail(@Body() body: { email: string }): Promise<void> {
    return this.mailService.sendMail(body);
  }
}
