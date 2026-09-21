import { createZodDto } from "nestjs-zod";
import { z } from 'zod';

export const prioritySchema = z.enum(['low', 'medium', 'high']);

export const createTaskSchema = z.object({
    title: z.string().trim().min(1),
    description: z.string().optional(),
    priority: prioritySchema,
})

export class CreateTaskDto extends createZodDto(
    createTaskSchema
) {}