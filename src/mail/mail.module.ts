import { Module } from '@nestjs/common';
import { MailerService } from './mail.service';
import { MailerController } from './mail.controller';

@Module({
  providers: [MailerService],
  controllers: [MailerController]
})
export class MailerModule {}
