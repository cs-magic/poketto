/*
  Warnings:

  - You are about to drop the column `plaformType` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[platformType,platformUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_plaformType_platformUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plaformType",
ADD COLUMN     "platformType" "PlatformType" NOT NULL DEFAULT 'Poketto';

-- CreateIndex
CREATE UNIQUE INDEX "User_platformType_platformUserId_key" ON "User"("platformType", "platformUserId");
