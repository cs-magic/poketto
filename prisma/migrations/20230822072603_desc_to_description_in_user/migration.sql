/*
  Warnings:

  - You are about to drop the column `desc` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "desc",
ADD COLUMN     "description" TEXT;
