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
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './quiz.entity';

@Controller('quizes')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  index() {
    return this.quizService.index();
  }

  @Get('/:id')
  show(@Param('id', new ParseIntPipe()) id: number): Promise<Quiz> {
    return this.quizService.findById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateQuizDto) {
    return this.quizService.create(data);
  }
}
