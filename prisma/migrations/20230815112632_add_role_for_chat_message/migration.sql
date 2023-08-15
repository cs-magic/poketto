-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "role" "PromptRoleType" NOT NULL DEFAULT 'user';
