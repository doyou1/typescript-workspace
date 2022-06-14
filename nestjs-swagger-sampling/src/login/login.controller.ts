import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get('/')
  login(): string {
    return 'login';
  }
}
