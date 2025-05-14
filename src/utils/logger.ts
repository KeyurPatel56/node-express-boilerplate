import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    isDevelopment ? winston.format.prettyPrint() : winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// Add a function to flush logs
export const flushLogs = async () => {
  return new Promise<void>((resolve, reject) => {
    logger.on('finish', resolve);
    logger.end();
  });
};

export default logger;
