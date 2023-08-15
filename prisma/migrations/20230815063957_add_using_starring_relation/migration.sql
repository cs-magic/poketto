/*
  Warnings:

  - You are about to drop the `_star` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_use` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_star" DROP CONSTRAINT "_star_A_fkey";

-- DropForeignKey
ALTER TABLE "_star" DROP CONSTRAINT "_star_B_fkey";

-- DropForeignKey
ALTER TABLE "_use" DROP CONSTRAINT "_use_A_fkey";

-- DropForeignKey
ALTER TABLE "_use" DROP CONSTRAINT "_use_B_fkey";

-- DropTable
DROP TABLE "_star";

-- DropTable
DROP TABLE "_use";

-- CreateTable
CREATE TABLE "UsingApp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "UsingApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StarringApp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "StarringApp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsingApp" ADD CONSTRAINT "UsingApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsingApp" ADD CONSTRAINT "UsingApp_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarringApp" ADD CONSTRAINT "StarringApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarringApp" ADD CONSTRAINT "StarringApp_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
