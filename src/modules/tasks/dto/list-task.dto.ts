import { createZodDto } from "nestjs-zod";
import { prioritySchema } from "./create-task.dto.js";
import { z } from 'zod';

export class ListTasksQueryDto extends createZodDto(
    z.object({
        completed: z
            .enum(['true', 'false'])
            .transform((v) => v === 'true')
            .optional(),
        priority: prioritySchema.optional(),
    }),
) {}