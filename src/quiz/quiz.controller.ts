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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  index() {
    return this.quizService.index();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  show(@Param('id', new ParseIntPipe()) id: number): Promise<Quiz> {
    return this.quizService.findById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  create(@Body() data: CreateQuizDto) {
    return this.quizService.create(data);
  }
}
