/*
  Warnings:

  - Added the required column `platformId` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "App" ADD COLUMN     "platformId" TEXT NOT NULL;
