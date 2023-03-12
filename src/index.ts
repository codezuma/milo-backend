import express, { Errback, Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
 const route = require('./routes/index')
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({type:"*/*"}))

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running👍');
  res.status
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/api',require('./routes/index'));


app.get('*', (req: Request, res: Response) => {
  res.status(404);
  res.send('Bad request ❌');
  res.end();
});


