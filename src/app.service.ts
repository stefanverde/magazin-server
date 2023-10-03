import { Injectable } from '@nestjs/common';
//import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}


// @Injectable()
// export class MailService{
//     constructor(private readonly mailerService: MailerService) {}
  
//     sendMail(): void {
//       this.mailerService.sendMail({
//         to: 'vss@mailinator.com',
//         from: 'vss1@mailinator.com',
//         subject: 'test',
//         text: 'hello',
//         html: '<p>hello</p>',
//       });
//     }
//   }
