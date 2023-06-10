import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHander from './app/middleware/globalErrorHandler';
import { userRoute } from './app/modules/users/user.router';

const app: Application = express();
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users route
app.use('/api/v1/user/', userRoute.router);
// testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hurray server is live');
});
app.use(globalErrorHander);
export default app;
