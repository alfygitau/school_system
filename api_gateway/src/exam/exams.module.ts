import { Module } from "@nestjs/common";
import { ExamsController } from "./exams.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";

@Module({
    imports:[NatsClientModule],
    controllers:[ExamsController],
    providers:[],
    exports:[]
})
export class ExamsModule {}