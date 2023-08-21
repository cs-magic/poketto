-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "namespace" TEXT DEFAULT 'default',
ADD COLUMN     "vector" vector;
