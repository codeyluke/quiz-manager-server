import { IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty({ message: 'question is required' })
  @Length(1, 255)
  text: string;

  @IsBoolean()
  is_correct: boolean;
}
