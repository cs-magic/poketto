/*
  Warnings:

  - You are about to drop the column `spaceId` on the `StarringApp` table. All the data in the column will be lost.
  - Added the required column `userId` to the `StarringApp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StarringApp" DROP CONSTRAINT "StarringApp_spaceId_fkey";

-- AlterTable
ALTER TABLE "StarringApp" DROP COLUMN "spaceId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StarringApp" ADD CONSTRAINT "StarringApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
