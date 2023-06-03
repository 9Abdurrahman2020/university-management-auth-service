import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Hurray we are on live');
});

export default app;
