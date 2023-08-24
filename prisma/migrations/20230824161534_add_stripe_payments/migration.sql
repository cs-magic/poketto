/*
  Warnings:

  - You are about to drop the column `stripe_current_period_end` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Transcation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StripeMode" AS ENUM ('payment', 'subscription');

-- CreateEnum
CREATE TYPE "StripeSubscriptionLevel" AS ENUM ('premidum', 'extreme');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('charge', 'consume');

-- DropForeignKey
ALTER TABLE "Transcation" DROP CONSTRAINT "Transcation_userId_fkey";

-- DropIndex
DROP INDEX "User_stripe_customer_id_key";

-- DropIndex
DROP INDEX "User_stripe_subscription_id_key";

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "cost" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripe_current_period_end",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_price_id",
DROP COLUMN "stripe_subscription_id",
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionEnd" TIMESTAMP(3);

-- DropTable
DROP TABLE "Transcation";

-- CreateTable
CREATE TABLE "StripeProduct" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "mode" "StripeMode" NOT NULL,
    "expire" INTEGER,
    "level" "StripeSubscriptionLevel",

    CONSTRAINT "StripeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePayment" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "redeemCode" TEXT,
    "productId" TEXT NOT NULL,
    "userId" VARCHAR(5) NOT NULL,

    CONSTRAINT "StripePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "StripePayment" ADD CONSTRAINT "StripePayment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "StripeProduct"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StripePayment" ADD CONSTRAINT "StripePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
