import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHander from './app/middleware/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users route
app.use('/api/v1/', routes);
// testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hurray server is live');
});
// Global error handler
app.use(globalErrorHander);

// Route not found handler
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
});
export default app;
