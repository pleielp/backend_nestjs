import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './calc/calc.module';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.confg';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), CalcModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
