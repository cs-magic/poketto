-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_conversationUserId_conversationAppId_fkey";

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_conversationUserId_conversationAppId_fkey" FOREIGN KEY ("conversationUserId", "conversationAppId") REFERENCES "Conversation"("userId", "appId") ON DELETE CASCADE ON UPDATE CASCADE;
