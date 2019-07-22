import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import { User } from '../interfaces/user.interface';
import { ID } from '../interfaces/common.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  private async validate(userData: User): Promise<User> {
    return await this.userService.findOne({email: userData.email});
  }

  public async login(user: User): Promise<any | { status: number }> {
    return this.validate(user).then((userData) => {
      if (!userData) {
        throw new UnauthorizedException();
      }
      this.userService.checkPassword(user.password, userData.hash).then((result) => {
        console.log(result)
        if (result) {
          let payload = `${userData._id}`;
          const accessToken = this.jwtService.sign(payload);
          return {
            expires_in: 3600,
            access_token: accessToken,
            status: 200
          }
        } else {
          throw new UnauthorizedException();
        }

      }).catch(() => {
        throw new UnauthorizedException();
      })
    })
  }

  public async register(user: User): Promise<any> {
    return this.userService.create(user);
  }

  public async me(token) {
    const idUser = await this.jwtService.decode(token) as ID;
    return this.userService.findOneById(idUser);
  }
}
