import { Module } from "@nestjs/common";
import { TasksController } from "./task.controller.js";
import { TasksService } from "./task.service.js";

@Module({
    controllers: [TasksController],
    providers: [TasksService],
})

export class TasksModule {}

