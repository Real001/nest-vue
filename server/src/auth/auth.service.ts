import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'winston';
import { UserService } from '../user/user.service';
import { User, LoginData } from '../interfaces/user.interface';
import { ID } from '../interfaces/common.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  private async validate(loginData: LoginData): Promise<User> {
    return await this.userService.findOne({ email: loginData.email });
  }

  public async login(loginData: LoginData): Promise<any | { status: number }> {
    return this.validate(loginData).then(userData => {
      if (!userData) {
        throw new UnauthorizedException();
      }
      return this.userService
        .checkPassword(loginData.password, userData.hash)
        .then(result => {
          if (result) {
            const payload = `${userData._id}`;
            const accessToken = this.jwtService.sign(payload);
            return {
              expires_in: 36000,
              code_student_token: accessToken,
              status: 200,
            };
          } else {
            throw new UnauthorizedException();
          }
        })
        .catch(() => {
          throw new UnauthorizedException();
        });
    });
  }

  public async register(user: User): Promise<any> {
    return this.userService.create(user);
  }

  public async me(token) {
    const idUser = (await this.jwtService.decode(token)) as ID;
    return this.userService.findOneById(idUser);
  }
}
