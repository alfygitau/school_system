import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;
    const ip = req.ip;
    const userAgent = headers['user-agent'] || 'unknown';

    const logMessage = `METHOD: ${method} | URL: ${originalUrl} | IP: ${ip} | User-Agent: ${userAgent} | TIME: ${new Date().toISOString()} | BODY: ${JSON.stringify(body)}`;

    this.loggerService.log(logMessage);
    
    next();
  }
}
