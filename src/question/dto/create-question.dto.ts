import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'question is required' })
  @Length(3, 255)
  question: string;
}
