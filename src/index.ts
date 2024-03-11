import express from 'express';
import cors from 'cors';
import log from './utils/logger';

import { seasonRoutes } from './modules/seasons';

const port = 8080;
const url = `http://localhost:${port}`;

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/seasons', seasonRoutes);

app.listen(port, () => {
  log.info(`servidor iniciado em ${url}`);
});

// tip 1: avoid the fatal error "tenant or user not found" from prisma by MAKING SURE THAT THE FUCKING DATABASE IS RUNNING
