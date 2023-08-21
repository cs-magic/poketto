CREATE EXTENSION IF NOT EXISTS vector;



-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "namespace" TEXT DEFAULT 'default',
    "vector" vector,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcation" (
    "id" TEXT NOT NULL,
    "userId" VARCHAR(5) NOT NULL,

    CONSTRAINT "Transcation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transcation" ADD CONSTRAINT "Transcation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
