import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Internal server error';
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message =
        (typeof res === 'object' && res !== null && 'message' in res
          ? (res as Record<string, unknown>).message
          : exception.message) as string | string[];
    }

    const error = Array.isArray(message) && message.length > 0
      ? message[0]
      : typeof message === 'string' && message
        ? message
        : 'Internal server error';

    response.status(status).json({
      success: false,
      error,
      statusCode: status,
    });
  }
}
