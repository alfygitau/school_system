import { Module } from "@nestjs/common";
import { StorageController } from "./storage.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";

@Module({
    imports:[NatsClientModule],
    controllers:[StorageController],
    providers:[],
    exports:[]
})
export class StorageModule {}