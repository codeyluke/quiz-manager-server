import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bycrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dto/register-user.req.dto';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneWithUsername(username);
    if (user && (await bycrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(data: RegisterUserDto) {
    const user = await this.userService.create(data);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      data: {
        ...user,
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      },
    };
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      data: {
        ...user,
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          expiresIn: configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        }),
      },
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
