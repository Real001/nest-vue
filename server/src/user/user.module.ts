import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserSchema } from "./user.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secretOrPrivateKey: 'secretIdeStudent'
    })
	],
	providers: [ UserService, UserResolver ]
})
export class UserModule {}
