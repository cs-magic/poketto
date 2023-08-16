/*
  Warnings:

  - You are about to drop the column `plaformTyoe` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plaformType,platformUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platformUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "plaformTyoe",
ADD COLUMN     "plaformType" "PlatformType" NOT NULL DEFAULT 'Poketto',
ADD COLUMN     "platformUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_plaformType_platformUserId_key" ON "User"("plaformType", "platformUserId");
