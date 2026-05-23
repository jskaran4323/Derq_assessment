import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};
