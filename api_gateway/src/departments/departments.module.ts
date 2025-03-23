import { Module } from "@nestjs/common";
import { DepartmentsController } from "./departments.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";

@Module({
    imports:[NatsClientModule],
    controllers:[DepartmentsController],
    providers:[]
})
export class DepartmentsModule {}