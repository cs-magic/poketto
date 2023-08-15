/*
  Warnings:

  - A unique constraint covering the columns `[usingAppId]` on the table `ChatMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usingAppId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "usingAppId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessage_usingAppId_key" ON "ChatMessage"("usingAppId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_usingAppId_fkey" FOREIGN KEY ("usingAppId") REFERENCES "UsingApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
