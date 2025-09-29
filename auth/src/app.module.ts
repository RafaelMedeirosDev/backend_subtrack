import { Module } from '@nestjs/common';
import { PrismaService } from './config/db/prisma-orm';
import { AuthController } from './controllers/AuthController';
import { LoginUseCase } from './usecases/auth/LoginUseCase';
import { FindUserUseCase } from './usecases/users/FindUserUseCase';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { UserRepository } from './domain/repositories/UserRepository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    JwtService,
    PrismaService,
    LoginUseCase,
    FindUserUseCase,
  ],
})
export class AppModule {}
