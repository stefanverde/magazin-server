import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from './mail.service';
import { Get } from '@nestjs/common';

@ApiTags("Mail")
@Controller("mail")
    export class MailerController{
      constructor(private readonly mailerService: MailerService) {}

      @Get()
        sendMail(): void{
          return this.mailerService.sendMail();
        }
      }