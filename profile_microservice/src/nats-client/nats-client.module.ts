import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats'],
          reconnect: true, // Enable reconnect
          maxReconnectAttempts: -1, // Infinite reconnect attempts
          reconnectTimeWait: 5000,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats'],
          reconnect: true, // Enable reconnect
          maxReconnectAttempts: -1, // Infinite reconnect attempts
          reconnectTimeWait: 5000,
        },
      },
    ]),
  ],
  providers: [],
})
export class NatsClientModule {}
