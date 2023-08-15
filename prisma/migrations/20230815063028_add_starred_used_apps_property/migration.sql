-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "AppComment" DROP CONSTRAINT "AppComment_appId_fkey";

-- DropForeignKey
ALTER TABLE "AppComment" DROP CONSTRAINT "AppComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "AppModel" DROP CONSTRAINT "AppModel_appId_fkey";

-- DropForeignKey
ALTER TABLE "AppState" DROP CONSTRAINT "AppState_appId_fkey";

-- DropForeignKey
ALTER TABLE "AppTag" DROP CONSTRAINT "AppTag_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessageAction" DROP CONSTRAINT "ChatMessageAction_messageId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessageAction" DROP CONSTRAINT "ChatMessageAction_userId_fkey";

-- DropForeignKey
ALTER TABLE "FollowRelation" DROP CONSTRAINT "FollowRelation_fromId_fkey";

-- DropForeignKey
ALTER TABLE "FollowRelation" DROP CONSTRAINT "FollowRelation_toId_fkey";

-- DropForeignKey
ALTER TABLE "InvitationRelation" DROP CONSTRAINT "InvitationRelation_toId_fkey";

-- DropForeignKey
ALTER TABLE "PrommptMessage" DROP CONSTRAINT "PrommptMessage_appModelId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpaceRelation" DROP CONSTRAINT "UserSpaceRelation_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "_use" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_star" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_use_AB_unique" ON "_use"("A", "B");

-- CreateIndex
CREATE INDEX "_use_B_index" ON "_use"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_star_AB_unique" ON "_star"("A", "B");

-- CreateIndex
CREATE INDEX "_star_B_index" ON "_star"("B");

-- AddForeignKey
ALTER TABLE "FollowRelation" ADD CONSTRAINT "FollowRelation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowRelation" ADD CONSTRAINT "FollowRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpaceRelation" ADD CONSTRAINT "UserSpaceRelation_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationRelation" ADD CONSTRAINT "InvitationRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "UniversalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AppCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppModel" ADD CONSTRAINT "AppModel_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppState" ADD CONSTRAINT "AppState_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrommptMessage" ADD CONSTRAINT "PrommptMessage_appModelId_fkey" FOREIGN KEY ("appModelId") REFERENCES "AppModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppTag" ADD CONSTRAINT "AppTag_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageAction" ADD CONSTRAINT "ChatMessageAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageAction" ADD CONSTRAINT "ChatMessageAction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppComment" ADD CONSTRAINT "AppComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppComment" ADD CONSTRAINT "AppComment_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_use" ADD CONSTRAINT "_use_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_use" ADD CONSTRAINT "_use_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_star" ADD CONSTRAINT "_star_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_star" ADD CONSTRAINT "_star_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
