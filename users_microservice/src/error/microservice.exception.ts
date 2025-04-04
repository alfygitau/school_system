import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    console.error('🚨 Exception caught:', exception);

    let response = {
      message: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    // Handle known exceptions (e.g., HttpException)
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      response = {
        message: typeof errorResponse === 'string' ? errorResponse : JSON.stringify(errorResponse),
        statusCode: exception.getStatus(),
      };
    } else if (exception.response && exception.status) {
      // Handle known RPC exceptions (e.g., RpcException)
      response = {
        message: typeof exception.response === 'string' ? exception.response : JSON.stringify(exception.response),
        statusCode: exception.status,
      };
    } else if (exception.message) {
      // Handle other unhandled exceptions
      response.message = typeof exception.message === 'string' ? exception.message : JSON.stringify(exception.message);
    }
    

    // Return an Observable error
    return throwError(() => response);
  }
}
