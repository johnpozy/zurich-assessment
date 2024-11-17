import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const { message, name } = exception;
    const ctx = host.switchToHttp();
    const customMessage = message || 'Unexpected error occurred';
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      success: false,
      code: httpStatus,
      error: customMessage,
      meta: exception,
    };

    Logger.error(`${exception.stack || exception.message}`, name);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
