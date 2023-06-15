import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { QuestionService } from 'src/question/question.service';
import { QuizService } from 'src/quiz/quiz.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class OptionController {
  constructor(
    private optionService: OptionService,
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('quiz_id', new ParseIntPipe()) quiz_id: number,
    @Param('question_id', new ParseIntPipe()) question_id: number,
    @Body()
    data: CreateOptionDto,
  ) {
    const quiz = await this.quizService.findById(quiz_id);
    console.log(
      'TODO - validation for ensuring question belongs to quiz',
      quiz,
    );
    const question = await this.questionService.findById(question_id);
    return this.optionService.create(question, data);
  }
}
