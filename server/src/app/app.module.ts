import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoClient } from 'mongodb';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as moment from 'moment-timezone';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { DateScalar } from '../common/scalars/date.scalar';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { IdeModule } from '../ide/ide.module';
import { IdeService } from '../ide/ide.service';

const { combine, timestamp, colorize, printf } = winston.format;

interface InfoView {
  timestamp: string;
  level: string;
  message: string;
}

const consoleFormat = printf(
  (info: InfoView) => `${moment(new Date()).tz('Asia/Krasnoyarsk').format()} - ${info.level}: ${info.message}`
);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-vue', { useNewUrlParser: true}),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ req }),
    }),
    AppService,
    UserModule,
    IdeModule,
    ConfigModule,
    AuthModule,
    WinstonModule.forRoot({
      exceptionHandlers: [
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD-HH',
          filename: `./logs/%DATE%-exceptions.log`,
        }),
      ],
      format: combine(timestamp(), consoleFormat),
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: combine(timestamp(), colorize(), consoleFormat),
          handleExceptions: true,
          level: 'debug',
        }),
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD-HH',
          filename: `./logs/%DATE%-error.log`,
          level: 'error',
        }),
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD-HH',
          filename: `./logs/%DATE%.log`,
        }),
      ],
    })
      ],
  providers: [DateScalar, UserService, IdeService],
})
export class AppModule {}
