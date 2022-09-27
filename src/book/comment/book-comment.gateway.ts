import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { BookCommentService } from './book-comment.service';

@WebSocketGateway()
export class BookCommentGateway {
  @WebSocketServer()
  service: Server;

  constructor(private readonly bookCommentService: BookCommentService) {}

  @SubscribeMessage('addComment')
  addComment(@MessageBody() messageData): Observable<any> {
    const data = JSON.parse(messageData);
    return from(this.bookCommentService.create(data)).pipe(
      map((res) => {
        return {
          event: 'addComment',
          data: res,
        };
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  @SubscribeMessage('getAllComments')
  getAllComments(@MessageBody() messageData): Observable<any> {
    const data = JSON.parse(messageData);
    return from(this.bookCommentService.findAllBookComment(data.bookId)).pipe(
      map((res) => {
        return { event: 'getAllComments', data: res };
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
