import { injectable } from 'tsyringe';
import prisma from '../../../../database';
import { deleteFile } from '../../../../utils/file';

interface IRequest {
  userId: string;
  avatar: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  async execute({ avatar, userId: id }: IRequest): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
      },
    });
  }
}
