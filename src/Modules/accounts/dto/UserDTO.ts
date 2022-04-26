import { User } from '@prisma/client';

export class UserDTO {
  private id: string;
  private email: string;
  private driver_license: string;
  private admin: boolean;
  private createdAt: Date;

  private constructor(
    id: string,
    email: string,
    driver_license: string,
    admin: boolean,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.driver_license = driver_license;
    this.admin = admin;
    this.createdAt = createdAt;
  }

  static fromUser(user: User): UserDTO {
    return new UserDTO(
      user.id,
      user.email,
      user.driver_license,
      user.admin,
      user.createdAt,
    );
  }
}
