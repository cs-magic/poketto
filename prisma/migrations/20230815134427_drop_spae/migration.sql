/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSpaceRelation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpaceRelation" DROP CONSTRAINT "UserSpaceRelation_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpaceRelation" DROP CONSTRAINT "UserSpaceRelation_userId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "spaceId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "UserSpaceRelation";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
