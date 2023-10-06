import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync ({
      useFactory: async () => ({
        transport:{
          host:"smtp.gmail.com",
          auth: {
            user: "verdestefan87@gmail.com",
            pass: "rysc qsac igan zpvv"
          },
        },
        defaults: {
          from: "verdestefan87@gmail.com"
        },
        template: {
          dir: join(__dirname, "./templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    })
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController]
})
export class MailModule {}
