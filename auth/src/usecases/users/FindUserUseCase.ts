import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/User';
import { UserRepository } from 'src/domain/repositories/UserRepository';

interface Request {
  email: string;
}

type Response = User;

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ email }: Request): Promise<Response> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
