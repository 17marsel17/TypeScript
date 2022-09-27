import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookCommentModule } from './book/comment/book-comment.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot(MONGO_URL),
    AuthModule,
    UserModule,
    BookCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
