import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import './database';
import { AppError } from './errors/AppError';
import { router } from './Routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
});
