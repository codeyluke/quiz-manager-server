import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterUserDto } from 'src/user/dto/register-user.req.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { LoginRequestDto } from './dto/login.request.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginRequestDto) {
    return await this.authService.login(data);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.register(data);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user['sub']);
  }
}
