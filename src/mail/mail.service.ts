import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
constructor(private readonly mailerService: MailerService){}

  sendMail():void{
    // this.mailerService.sendMail({
    //   to: "verdestefan87@yahoo.com", //implement whatever you egt from input 
    //   from: "verdestefan87@yahoo.com",
    //   subject: "test",
    //   text: "hello",
    //   html: "<p>hello</p>"
    // })
  }
}