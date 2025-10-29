import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './config';
import { uptime } from 'process';
import { timeStamp } from 'console';
import allRoutes from './app/routes';

const app: Application = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




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
  const query = JSON.stringify(req.query, null, 2); // Log query
  const params = JSON.stringify(req.params, null, 2); // Log params
  const formattedDate = formatDate(new Date());

  console.log('------------------------');
  console.log(
    `Api :- \x1b[0m\x1b[34m${method}\x1b[0m \x1b[32m${url}\x1b[0m \x1b[36m[${formattedDate}]\x1b[0m`
  );
  console.log('Query:', query); // Log the query
  console.log('Params:', params); // Log the params
  console.log('------------------------');

  next();
};

app.use(requestLogger);



app.use('/api/v1', allRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Server is running..",
        environment: config.node_env,
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString()
    })
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;