/*
  Warnings:

  - You are about to drop the column `gpt3quota` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gpt4quota` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gpt3quota",
DROP COLUMN "gpt4quota",
ADD COLUMN     "quota" JSONB;
