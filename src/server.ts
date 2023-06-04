import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

const port = config.port || 5000;

(async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info('Database connected successfully');
    app.listen(port, () => {
      infoLogger.info('Server is listening on port', port);
    });
  } catch (err) {
    errorLogger.error("Couldn't connect to database", err);
  }
})();
