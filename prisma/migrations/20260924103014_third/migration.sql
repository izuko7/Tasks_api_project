-- AlterTable
ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'medium';

-- CreateIndex
CREATE INDEX "task_userId_idx" ON "task"("userId");
