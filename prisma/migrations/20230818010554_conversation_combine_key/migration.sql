/*
  Warnings:

  - You are about to drop the column `conversationId` on the `ChatMessage` table. All the data in the column will be lost.
  - The primary key for the `Conversation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `conversationAppId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conversationUserId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_conversationId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "conversationId",
ADD COLUMN     "conversationAppId" TEXT NOT NULL,
ADD COLUMN     "conversationUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY ("userId", "appId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_conversationUserId_conversationAppId_fkey" FOREIGN KEY ("conversationUserId", "conversationAppId") REFERENCES "Conversation"("userId", "appId") ON DELETE RESTRICT ON UPDATE CASCADE;
