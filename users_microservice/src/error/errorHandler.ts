import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error('RPC Exception:', exception);

    // Ensure exception is properly formatted
    const errorMessage =
      exception instanceof Error ? exception.message : 'An unknown error occurred';

    return super.catch(new RpcException(errorMessage), host);
  }
}
