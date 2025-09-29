import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/db/prisma-orm';
import { User } from 'src/domain/entities/User';
import {
  ICreateUser,
  IFindOneBy,
  UserRepository,
} from 'src/domain/repositories/UserRepository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneBy({ email }: IFindOneBy): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  save({ name, email, password }: ICreateUser): Promise<User> {
    return this.prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
