import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Controller,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStateValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get('/:user')
  getBoardsByUser(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getBoardsByUser(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStateValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
