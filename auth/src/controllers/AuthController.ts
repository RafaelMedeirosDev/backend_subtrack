import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/usecases/auth/LoginUseCase';
import { RegisterUseCase } from 'src/usecases/auth/RegisterUseCase';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('auth/login')
  login(
    @Body() body: { email: string; password: string },
  ): Promise<{ accessToken: string }> {
    return this.loginUseCase.execute(body);
  }

  @Post('auth/register')
  register(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<{ accessToken: string }> {
    return this.registerUseCase.execute(body);
  }
}
