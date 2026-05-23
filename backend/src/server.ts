import express from 'express';
import cors from "cors";
import { corsConfig } from './config/cors.config';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { registerRoutes } from '.';

const app = express()
const PORT = process.env.PORT || '3000'
const logger = pino({ level: 'info' });

app.use(pinoHttp({ logger }));

app.use(cors(corsConfig));
app.use(express.json())

registerRoutes(app);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});




