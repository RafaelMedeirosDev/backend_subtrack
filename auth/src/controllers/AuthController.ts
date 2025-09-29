import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/usecases/auth/LoginUseCase';

@Controller()
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('auth/login')
  login(
    @Body() body: { email: string; password: string },
  ): Promise<{ accessToken: string }> {
    return this.loginUseCase.execute(body);
  }
}
