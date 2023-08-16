/*
  Warnings:

  - You are about to drop the column `platform` on the `App` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "platform",
ADD COLUMN     "platformType" "PlatformType" NOT NULL DEFAULT 'Poketto';
