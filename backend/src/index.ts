import { Express } from 'express';
import countryRoutes from './v1/routes/country.routes.js';
import trafficRoutes from './v1/routes/traffic.routes.js';


const API_VERSION = 'v1';

export const registerRoutes = (app: Express): void =>{
  const baseURL = `/api/${API_VERSION}`

  app.use(`${baseURL}/countries`, countryRoutes)
  app.use(`${baseURL}/traffic`, trafficRoutes)
}