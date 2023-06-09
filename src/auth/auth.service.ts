import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dto/register-user.req.dto';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { LoginRequestDto } from './dto/login.request.dto';

config();
const configService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDto) {
    const user = await this.userService.create(data);
    const tokens = await this.getTokens(user.id, user.name);
    this.updateRefreshToken(user, tokens.refresh_token);
    return {
      data: {
        user: {
          id: user.id,
          user: user.name,
          email: user.email,
        },
        tokens,
      },
    };
  }

  async login(data: LoginRequestDto) {
    const user = await this.userService.findOneWithUsername(data.username);
    if (!user) throw new BadRequestException('User do not exists');
    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.name);
    this.updateRefreshToken(user, tokens.refresh_token);
    return {
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        tokens,
      },
    };
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  async getTokens(userId: number, username: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const hashRefreshToken = await this.hashData(refreshToken);
    await this.userService.updateRefreshToken(user.id, hashRefreshToken);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findOneWithId(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('!Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    return {
      data: { tokens },
    };
  }
}
