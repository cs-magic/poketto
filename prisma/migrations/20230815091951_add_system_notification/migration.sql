-- AlterEnum
ALTER TYPE "ChatMessageFormatType" ADD VALUE 'systemNotification';

-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "userId" DROP NOT NULL;
