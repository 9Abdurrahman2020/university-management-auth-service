import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const miliSec = date.getMilliseconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds}:${miliSec} ${level}: ${message}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'info.log'),
      level: 'info',
    }),
  ],
});
const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
});

export { infoLogger, errorLogger };
