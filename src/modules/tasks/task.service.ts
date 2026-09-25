import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { ListTasksQueryDto } from "./dto/list-task.dto.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";




@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    // Créer une nouvelle tâche
    create(userId: string, dto: CreateTaskDto) {
        return this.prisma.task.create({ data: { ...dto, userId } });
    }

    // Chercher toute les tâches
    findAll(userId: string, filters: ListTasksQueryDto) {
        return this.prisma.task.findMany({
            where: { userId, ...filters},
            orderBy: { createdAt: 'desc'},
        });
    }

    // Chercher une tâche
    async findOne(userId: string, id: string) {
        const task = await this.prisma.task.findFirst({
            where: { id, userId}
        });
        if(!task) throw new NotFoundException(`Tâche avec ${id} introuvable`);
        return task;
    }

    // Mise à jour de la tâche
    async update(userId: string, id: string, dto: UpdateTaskDto) {
        await this.findOne(userId, id) //vétification
        return this.prisma.task.update({ where: {id}, data: dto})
    }

    async complete(userId: string, id: string) {
        await this.findOne(userId, id);
        return this.prisma.task.update({ 
            where: {id},
            data: { completed: true},
        });
    }


    async remove(userId: string, id: string) {
        await this.findOne(userId, id);
        await this.prisma.task.delete({
            where: {id},
        });
    }
}