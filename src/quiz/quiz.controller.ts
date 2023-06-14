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
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './quiz.entity';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  @UseGuards(JwtGuard)
  index() {
    return this.quizService.index();
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  show(@Param('id', new ParseIntPipe()) id: number): Promise<Quiz> {
    return this.quizService.findById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtGuard)
  create(@Body() data: CreateQuizDto) {
    return this.quizService.create(data);
  }
}
