import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.routes';
import { PrismaClient } from '@prisma/client';

const app: Application = express();

// Middleware
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric', // Include seconds
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Middleware to log requests and responses
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const query = JSON.stringify(req.query, null, 2);  // Log query parameters
  const params = JSON.stringify(req.params, null, 2); // Log route parameters
  const body = JSON.stringify(req.body, null, 2); // Log request body
  const formattedDate = formatDate(new Date());

  console.log('------------------------');
  console.log(
    `Api :- \x1b[0m\x1b[34m${method}\x1b[0m \x1b[32m${url}\x1b[0m \x1b[36m[${formattedDate}]\x1b[0m`
  );
  console.log('Query:', query); // Log the query
  console.log('Params:', params); // Log the params
  console.log('Body:', body); // Log the body
  console.log('------------------------');

  next();
};


app.use(express.json());
app.use(cors());
app.use(requestLogger)
// Routes
app.use('/api/v1/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export const prisma = new PrismaClient();
export default app;
