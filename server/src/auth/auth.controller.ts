import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private  readonly  authService:  AuthService) {}
}
