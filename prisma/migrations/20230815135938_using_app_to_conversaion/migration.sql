/*
  Warnings:

  - You are about to drop the column `usingAppId` on the `ChatMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conversationId]` on the table `ChatMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversationId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_usingAppId_fkey";

-- DropIndex
DROP INDEX "ChatMessage_usingAppId_key";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "usingAppId",
ADD COLUMN     "conversationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessage_conversationId_key" ON "ChatMessage"("conversationId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
