/*
  Warnings:

  - You are about to drop the `UniversalUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_creatorId_fkey";

-- DropTable
DROP TABLE "UniversalUser";

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
