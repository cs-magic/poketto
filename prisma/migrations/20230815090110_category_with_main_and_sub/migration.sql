/*
  Warnings:

  - A unique constraint covering the columns `[main,sub]` on the table `AppCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppCategory_main_sub_key" ON "AppCategory"("main", "sub");
