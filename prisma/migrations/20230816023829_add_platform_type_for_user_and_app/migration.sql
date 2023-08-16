-- AlterTable
ALTER TABLE "App" ALTER COLUMN "platform" SET DEFAULT 'Poketto';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plaformTyoe" "PlatformType" NOT NULL DEFAULT 'Poketto';
