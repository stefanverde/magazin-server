import { Controller, Get } from '@nestjs/common';
import { AppService/*, MailService */} from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('users')
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// @Controller('mail')
// export class MailerController {
//   constructor(private readonly mailerService: MailService) {}

//   @Get('/sendMail')
//   sendMail(): void {
//     return this.mailerService.sendMail();
//   }
// }
