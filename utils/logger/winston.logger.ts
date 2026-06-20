import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const LOG_DIR = process.env.LOG_DIR || 'reports/logs';
fs.mkdirSync(LOG_DIR, { recursive: true });

// ─── Format definitions ───────────────────────────────────────────────────────

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    const base = `[${String(timestamp)}] [${level.toUpperCase().padEnd(5)}] ${String(message)}`;
    return stack ? `${base}\n${String(stack)}` : base;
  })
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) =>
    `[${String(timestamp)}] ${level}: ${String(message)}`
  )
);

// ─── Singleton Logger ─────────────────────────────────────────────────────────

/**
 * Singleton Winston logger with daily-rotating file transports.
 * Log level is driven by the LOG_LEVEL environment variable (default: info).
 *
 * Usage:
 *   const logger = Logger.getInstance();
 *   logger.info('Test started');
 *   logger.error('Something failed', new Error('reason'));
 */
export class Logger {
  private static instance: Logger;
  private readonly wLogger: winston.Logger;

  private constructor() {
    this.wLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      transports: [
        // Console output
        new winston.transports.Console({
          format: consoleFormat,
          silent: process.env.LOG_CONSOLE === 'false',
        }),

        // Daily rotating combined log
        new DailyRotateFile({
          filename:    path.join(LOG_DIR, 'test-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize:     '20m',
          maxFiles:    '14d',
          format:      fileFormat,
        }),

        // Daily rotating error-only log
        new DailyRotateFile({
          filename:    path.join(LOG_DIR, 'error-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          level:       'error',
          maxSize:     '20m',
          maxFiles:    '14d',
          format:      fileFormat,
        }),
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(msg: string, meta?: object): void    { this.wLogger.info(msg, meta); }
  debug(msg: string, meta?: object): void   { this.wLogger.debug(msg, meta); }
  warn(msg: string, meta?: object): void    { this.wLogger.warn(msg, meta); }
  verbose(msg: string, meta?: object): void { this.wLogger.verbose(msg, meta); }

  error(msg: string, err?: unknown): void {
    if (err instanceof Error) {
      this.wLogger.error(msg, { stack: err.stack, errMsg: err.message });
    } else {
      this.wLogger.error(msg, { err });
    }
  }
}