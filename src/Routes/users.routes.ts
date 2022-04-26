import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { AuthenticateUserController } from '../Modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../Modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../Modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const usersRoute = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoute.post('/create', createUserController.handle);
usersRoute.post('/authenticate', authenticateUserController.handle);
usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoute };
