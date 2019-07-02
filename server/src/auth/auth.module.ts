import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({
    secretOrPrivateKey: 'secretIdeStudent'
  })],
  providers: [UserService, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
