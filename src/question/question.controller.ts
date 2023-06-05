import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { QuizService } from 'src/quiz/quiz.service';

@Controller('/quizes/:quiz_id/questions')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  async create(
    @Param('quiz_id', new ParseIntPipe()) quiz_id: number,
    @Body() data: CreateQuestionDto,
  ) {
    const quiz = await this.quizService.findById(quiz_id);
    return this.questionService.create(quiz, data);
  }

  @Get('/:id')
  show(@Param('id', new ParseIntPipe()) id: number) {
    return this.questionService.findById(id);
  }
}
