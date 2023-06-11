import cors from 'cors';
import express, { Application, Request, Response } from 'express';
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
app.use(globalErrorHander);
export default app;
