-- DropForeignKey
ALTER TABLE "StarringApp" DROP CONSTRAINT "StarringApp_appId_fkey";

-- DropForeignKey
ALTER TABLE "StarringApp" DROP CONSTRAINT "StarringApp_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsingApp" DROP CONSTRAINT "UsingApp_appId_fkey";

-- DropForeignKey
ALTER TABLE "UsingApp" DROP CONSTRAINT "UsingApp_spaceId_fkey";

-- AddForeignKey
ALTER TABLE "UsingApp" ADD CONSTRAINT "UsingApp_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsingApp" ADD CONSTRAINT "UsingApp_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarringApp" ADD CONSTRAINT "StarringApp_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarringApp" ADD CONSTRAINT "StarringApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
