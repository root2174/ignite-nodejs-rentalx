import express from 'express';
import { categoriesRoutes } from './Routes/categories.routes';

const app = express();

app.use(express.json());
app.use('/categories', categoriesRoutes);
app.use('/specifications', categoriesRoutes);

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
});
