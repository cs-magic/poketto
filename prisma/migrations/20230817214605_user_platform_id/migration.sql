/*
  Warnings:

  - You are about to drop the column `platformUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[platformType,platformId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platformId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_platformType_platformUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "platformUserId",
ADD COLUMN     "platformId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_platformType_platformId_key" ON "User"("platformType", "platformId");
