import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private logger = new Logger('HTTP');

  private get logFilePath(): string {
    // Generate a new log file name each day: requests-YYYY-MM-DD.log
    const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
    return path.join(__dirname, '../../logs', `requests-${today}.log`);
  }

  constructor() {
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    // Console log
    this.logger.log(logMessage);

    try {
      // Ensure directory exists before writing
      const logDir = path.dirname(this.logFilePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      // Append log to file
      fs.appendFileSync(this.logFilePath, logMessage, 'utf8');
    } catch (error) {
      console.error(`❌ Error writing log: ${error.message}`);
    }
  }
}
