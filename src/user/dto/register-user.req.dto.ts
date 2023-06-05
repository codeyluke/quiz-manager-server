import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Match } from '../decorator/match.decorator';

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 24)
  password: string;

  @IsNotEmpty()
  @Length(3, 24)
  @Match(RegisterUserDto, (s) => s.password)
  confirm_password: string;
}
