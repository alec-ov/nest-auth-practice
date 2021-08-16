import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import LoginUserDto from 'src/user/dto/user.login.dto';
import RegisterUserDto from 'src/user/dto/user.register.dto';
import IUser from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(credentials: LoginUserDto) {
    const user = await this.userService.findByLogin(credentials.login);
    const check = await bcrypt.compare(credentials.password, user.password);
    if (check) {
      return this.signTokens(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findById(payload.sub);

      console.log(user);

      if (user.refreshToken !== token) {
        throw new UnauthorizedException();
      }

      return this.signTokens(user);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException();
      }
      throw error;
    }
  }

  async register(user: RegisterUserDto) {
    user.password = await bcrypt.hash(user.password, 12);

    const newUser = await this.userService.createOne(user);
    return this.signTokens(newUser);
  }

  private async signTokens(user: IUser) {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        name: user.name,
      },
      { expiresIn: '1m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        name: user.name,
      },
      { expiresIn: '5m' },
    );
    await this.userService.updateToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }
}
