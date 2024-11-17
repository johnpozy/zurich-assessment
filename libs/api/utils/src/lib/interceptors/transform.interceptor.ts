import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle()
      .pipe(
        map(result => {
          let meta = null;
          let data = result;

          if (data?.docs || data?._doc) {
            data = data.docs || data?._doc;
            meta = result;

            delete meta.docs;
          }

          return {
            success: true,
            code: context.switchToHttp().getResponse().statusCode,
            data,
            meta,
          };
        })
      );
  }
}