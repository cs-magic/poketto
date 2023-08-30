-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('PuzzleInUse', 'FeatureRequest', 'BugReport', 'LeakReport', 'BusinessCollaboration');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "issueType" "IssueType" NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "userId" VARCHAR(5),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
