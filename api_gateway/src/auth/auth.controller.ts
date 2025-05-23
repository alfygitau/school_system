import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() payload: { email: string; password: string }) {
    return this.natsClient.send({ cmd: 'login' }, payload);
  }

  @Get('logout')
  async logout() {
    return this.natsClient.send({ cmd: 'logout' }, {});
  }
}