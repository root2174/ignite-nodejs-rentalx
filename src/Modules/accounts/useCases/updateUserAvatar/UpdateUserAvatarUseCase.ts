import { injectable } from 'tsyringe';
import { prismaClient } from '../../../../database';
import { deleteFile } from '../../../../utils/file';

interface IRequest {
  userId: string;
  avatar: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  async execute({ avatar, userId: id }: IRequest): Promise<void> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        avatar,
      },
    });
  }
}
