import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoClient } from 'mongodb';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from '../user/customer.service';
import { UserModule } from '../user/user.module';
import { DateScalar } from '../common/scalars/date.scalar';
import { ConfigModule } from '../config/config.module';

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
    }),
    AppService,
    UserModule,
    ConfigModule,
  ],
  providers: [DateScalar, UserService, ],
})
export class AppModule {}
