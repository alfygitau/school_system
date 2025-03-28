import { Module } from "@nestjs/common";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { EContentController } from "./econtent.controller";

@Module({
    imports:[NatsClientModule],
    exports:[],
    controllers:[EContentController],
    providers:[]
})
export class EContentModule {}