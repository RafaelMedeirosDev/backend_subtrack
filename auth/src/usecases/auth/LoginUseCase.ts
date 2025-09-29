import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FindUserUseCase } from '../users/FindUserUseCase';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface Request {
  email: string;
  password: string;
}

interface Response {
  accessToken: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}
  async execute({ email, password }: Request): Promise<Response> {
    const user = await this.findUserUseCase.execute({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const accessToken = this.jwtService.sign(
      { email: user.email },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return { accessToken };
  }
}
