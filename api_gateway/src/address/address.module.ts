import { Module } from "@nestjs/common";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { AddressController } from "./address.controller";

@Module({
    imports:[NatsClientModule],
    controllers:[AddressController],
    providers:[],
    exports:[]
})
export class AddressModule {}