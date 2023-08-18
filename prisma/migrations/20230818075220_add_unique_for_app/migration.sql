/*
  Warnings:

  - A unique constraint covering the columns `[platformType,platformId]` on the table `App` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "App_platformType_platformId_key" ON "App"("platformType", "platformId");
