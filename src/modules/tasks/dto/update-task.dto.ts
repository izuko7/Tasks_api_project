import { createZodDto } from "nestjs-zod";
import { createTaskSchema } from "./create-task.dto.js";
import { z } from 'zod';

export class UpdateTaskDto extends createZodDto(
    createTaskSchema.partial()
) {}