/*
  Warnings:

  - The values [Github,Discord] on the enum `PlatformType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlatformType_new" AS ENUM ('Poketto', 'FlowGPT', 'OpenAI', 'MidJourney', 'StableDiffusion', 'OpenChat', 'github', 'discord', 'google');
ALTER TABLE "App" ALTER COLUMN "platformType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "platformType" DROP DEFAULT;
ALTER TABLE "App" ALTER COLUMN "platformType" TYPE "PlatformType_new" USING ("platformType"::text::"PlatformType_new");
ALTER TABLE "User" ALTER COLUMN "platformType" TYPE "PlatformType_new" USING ("platformType"::text::"PlatformType_new");
ALTER TYPE "PlatformType" RENAME TO "PlatformType_old";
ALTER TYPE "PlatformType_new" RENAME TO "PlatformType";
DROP TYPE "PlatformType_old";
ALTER TABLE "App" ALTER COLUMN "platformType" SET DEFAULT 'Poketto';
ALTER TABLE "User" ALTER COLUMN "platformType" SET DEFAULT 'Poketto';
COMMIT;
