-- AlterTable
ALTER TABLE "App" ADD COLUMN     "modelArgs" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "platformArgs" JSONB,
ADD COLUMN     "quota" JSONB;
