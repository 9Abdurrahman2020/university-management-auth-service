import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

const PORT = config.port || 5000;

let server: Server;

(async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully');
    server = app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log("Couldn't connect to database", err);
  }
  // stop server and node if there's any unhandled rejection occur ( it usually occurs in asynchronous process )
  process.on('unhandledRejection', err => {
    if (server) {
      console.log(err);
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
  console.log(err);
  process.exit(1);
});
// handle server if we got any signal to terminate the server
process.on('SIGTERM', signal => {
  console.log(signal);
  if (server) {
    server.close();
  }
});
