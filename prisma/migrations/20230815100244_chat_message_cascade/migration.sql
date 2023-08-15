-- DropForeignKey
ALTER TABLE "AppAction" DROP CONSTRAINT "AppAction_appId_fkey";

-- DropForeignKey
ALTER TABLE "AppAction" DROP CONSTRAINT "AppAction_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_usingAppId_fkey";

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_usingAppId_fkey" FOREIGN KEY ("usingAppId") REFERENCES "UsingApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppAction" ADD CONSTRAINT "AppAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppAction" ADD CONSTRAINT "AppAction_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
