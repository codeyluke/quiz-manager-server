import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { QuizService } from 'src/quiz/quiz.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('quiz_id', new ParseIntPipe()) quiz_id: number,
    @Body() data: CreateQuestionDto,
  ) {
    const quiz = await this.quizService.findById(quiz_id);
    return this.questionService.create(quiz, data);
  }

  @Get('/:question_id')
  @UseGuards(JwtAuthGuard)
  show(@Param('question_id', new ParseIntPipe()) id: number) {
    return this.questionService.findById(id);
  }
}
