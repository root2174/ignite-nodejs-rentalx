import { Router } from 'express';
import { createSpecificationController } from '../Modules/Cars/UseCases/Specifications/CreateSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) =>
  createSpecificationController.handle(req, res),
);

export { specificationsRoutes };
