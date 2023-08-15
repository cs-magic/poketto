/*
  Warnings:

  - You are about to drop the column `userId` on the `StarringApp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UsingApp` table. All the data in the column will be lost.
  - Added the required column `spaceId` to the `StarringApp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spaceId` to the `UsingApp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StarringApp" DROP CONSTRAINT "StarringApp_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsingApp" DROP CONSTRAINT "UsingApp_userId_fkey";

-- AlterTable
ALTER TABLE "StarringApp" DROP COLUMN "userId",
ADD COLUMN     "spaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UsingApp" DROP COLUMN "userId",
ADD COLUMN     "spaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UsingApp" ADD CONSTRAINT "UsingApp_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarringApp" ADD CONSTRAINT "StarringApp_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
