/*
  Warnings:

  - You are about to drop the column `categoryId` on the `App` table. All the data in the column will be lost.
  - The primary key for the `AppCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AppCategory` table. All the data in the column will be lost.
  - Added the required column `categoryMain` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categorySub` to the `App` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `main` on the `AppCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `sub` to the `AppCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_categoryId_fkey";

-- DropIndex
DROP INDEX "AppCategory_main_sub_key";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "categoryId",
ADD COLUMN     "categoryMain" INTEGER NOT NULL,
ADD COLUMN     "categorySub" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AppCategory" DROP CONSTRAINT "AppCategory_pkey",
DROP COLUMN "id",
DROP COLUMN "main",
ADD COLUMN     "main" INTEGER NOT NULL,
DROP COLUMN "sub",
ADD COLUMN     "sub" INTEGER NOT NULL,
ADD CONSTRAINT "AppCategory_pkey" PRIMARY KEY ("main", "sub");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_categoryMain_categorySub_fkey" FOREIGN KEY ("categoryMain", "categorySub") REFERENCES "AppCategory"("main", "sub") ON DELETE CASCADE ON UPDATE CASCADE;
