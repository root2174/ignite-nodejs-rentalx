import express from 'express';
import swaggerUi from 'swagger-ui-express';
import './database';
import { router } from './Routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
});
