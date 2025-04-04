import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class UniqueConstraintFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const message = exception.message || 'Database error';

    // ✅ Check for unique constraint violation
    if (message.includes('duplicate key value violates unique constraint')) {
      const match = message.match(/\((.*?)\)=\((.*?)\)/); // Extract (column)=(value)
      if (match) {
        const field = match[1]; // Extract the column name
        return throwError(() => new RpcException({
          statusCode: 400,
          message: `The ${field} field must be unique.`,
        }));
      }
    }

    // ✅ Handle generic errors
    return throwError(() => new RpcException({
      statusCode: 400,
      message: message,
    }));
  }
}
