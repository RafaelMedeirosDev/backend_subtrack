import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FindUserUseCase } from '../users/FindUserUseCase';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/domain/repositories/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Response {
  accessToken: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async execute({ name, email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const userCreated = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = this.jwtService.sign(
      { email: userCreated.email, name: userCreated.name, id: userCreated.id },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return { accessToken };
  }
}
