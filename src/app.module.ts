import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { configuration, IConfig, validate } from './public/configuration';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ItemModule } from './items/item.module';
import { Items } from './items/entities/items.entity';
import { OrderModule } from './order/order.module';
import { Orders } from './order/entity/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `config/${process.env.NODE_ENV || 'development'}.env`,
        '.env',
      ],
      load: [configuration],
      isGlobal: true,
      cache: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService<IConfig>) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          entities: [User, Items, Orders],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),

    ItemModule,
    HealthModule,
    UsersModule,
    AuthModule,
    OrderModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
