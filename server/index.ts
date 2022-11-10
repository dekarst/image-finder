import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import imageRouter from './routes/images';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/images', imageRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at Port:${port}`);
});
