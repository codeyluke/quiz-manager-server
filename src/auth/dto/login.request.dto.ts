import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1)
  username: string;

  @IsNotEmpty()
  @Length(1)
  password: string;
}
