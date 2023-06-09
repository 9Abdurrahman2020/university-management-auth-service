import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHander from './app/middleware/globalErrorHandler';
import usersRouter from './app/modules/users/users.router';

const app: Application = express();
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users route
app.use('/api/v1/user/', usersRouter);
// testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hurray server is live');
});
app.use(globalErrorHander);
export default app;
