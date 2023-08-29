-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "isUsingFree" BOOLEAN DEFAULT false,
ALTER COLUMN "modelType" SET DEFAULT 'gpt-3.5-turbo';
