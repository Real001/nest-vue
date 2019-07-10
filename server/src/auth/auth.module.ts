import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule,
    JwtModule.register({
    secretOrPrivateKey: 'secretIdeStudent'
  })],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
