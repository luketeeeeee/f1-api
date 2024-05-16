import express, { Request, Response } from 'express';
import cors from 'cors';
// import log from './utils/logger';

import { seasonRoutes } from './modules/seasons';
import { raceRoutes } from './modules/races';
import { driverRoutes } from './modules/drivers';
import logger from './utils/logger';

const port = 8080;
const url = `http://localhost:${port}`;

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/seasons', seasonRoutes);
app.use('/races', raceRoutes);
app.use('/drivers', driverRoutes);

const healthCheckRouter = express.Router();

healthCheckRouter.route('/health').get(async (_, res: Response) => {
  res.send("it's hammer time");
});
healthCheckRouter.route('/').get(async (_, res: Response) => {
  res.send({
    routes: { seasons: '/seasons', drivers: '/drivers' },
  });
});

app.use('/', healthCheckRouter);

app.listen(port, () => {
  logger.info(`servidor iniciado em ${url}`);
});

// tip 1: avoid the fatal error "tenant or user not found" from prisma by MAKING SURE THAT THE FUCKING DATABASE IS RUNNING
