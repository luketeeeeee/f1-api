import express from 'express';
import cors from 'cors';
import log from './utils/logger';

// routes imports

const port = 8080;
const url = `http://localhost:${port}`;

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// app.use(routes)

app.listen(port, () => {
  log.info(`servidor iniciado em ${url}`);
});
