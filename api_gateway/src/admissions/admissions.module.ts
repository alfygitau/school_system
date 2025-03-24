import { Module } from "@nestjs/common";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { AdmissionsController } from "./admissions.controller";

@Module({
    imports:[NatsClientModule],
    controllers:[AdmissionsController],
    exports:[],
    providers:[]
})
export class AdmissionsModule {}