import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

const port = config.port || 5000;

let server: Server;

(async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info('Database connected successfully');
    server = app.listen(port, () => {
      infoLogger.info('Server is listening on port', port);
    });
  } catch (err) {
    errorLogger.error("Couldn't connect to database", err);
  }
  // stop server and node if there's any unhandled rejection occur ( it usually occurs in asynchronous process )
  process.on('unhandledRejection', err => {
    if (server) {
      errorLogger.error(err);
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
})();
// handle uncaughtException error
process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});
// handle server if we got any signal to terminate the server
process.on('SIGTERM', signal => {
  infoLogger.info(signal);
  if (server) {
    server.close();
  }
});
