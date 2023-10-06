import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
//import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}
        // private readonly databaseService: UsersService){}

        // async sendMailToDatabaseEmails(): Promise<void> {
            
        //     const emailAddresses = await this.databaseService.getEmailFromDatabase();
        // }
    async sendMail(dbEmail:string): Promise <void> {
        await this.mailerService.sendMail({
            to: dbEmail,
            from:"verdestefan87@gmail.com",
            subject:"password Reset",
            template: "welcome"
            
        })
    }
}