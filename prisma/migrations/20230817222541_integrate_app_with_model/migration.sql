/*
  Warnings:

  - You are about to drop the `AppModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrommptMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `modelName` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppModel" DROP CONSTRAINT "AppModel_appId_fkey";

-- DropForeignKey
ALTER TABLE "PrommptMessage" DROP CONSTRAINT "PrommptMessage_appModelId_fkey";

-- AlterTable
ALTER TABLE "App" ADD COLUMN     "isOpenSource" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "modelArgs" JSONB,
ADD COLUMN     "modelName" TEXT NOT NULL;

-- DropTable
DROP TABLE "AppModel";

-- DropTable
DROP TABLE "PrommptMessage";
