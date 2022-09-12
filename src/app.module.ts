import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './config';

@Module({
  imports: [BookModule, MongooseModule.forRoot(MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
