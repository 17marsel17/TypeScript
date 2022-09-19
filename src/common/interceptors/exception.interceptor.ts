import {
  BadGatewayException,
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => ({ status: 'success', data: data })),
      catchError((err) =>
        throwError(
          () => new BadRequestException({ status: 'fail', data: err.message }),
        ),
      ),
    );
  }
}
