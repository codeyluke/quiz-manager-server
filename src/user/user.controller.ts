import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.req.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    data: RegisterUserDto,
  ) {
    return this.userService.create(data);
  }
}
