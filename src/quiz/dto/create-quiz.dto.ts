import { IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty({ message: 'title is required' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty({ message: 'description is required' })
  @Length(3)
  description: string;

  @IsBoolean()
  is_active: boolean;
}
