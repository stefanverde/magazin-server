import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
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
          from: "admin@gmail.com"
        },
      }),
    }),
    
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController]
})
export class MailModule {}
