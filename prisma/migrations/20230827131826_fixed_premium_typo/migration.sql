/*
  Warnings:

  - The values [premidum] on the enum `StripeSubscriptionLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StripeSubscriptionLevel_new" AS ENUM ('premium', 'extreme');
ALTER TABLE "StripeProduct" ALTER COLUMN "level" TYPE "StripeSubscriptionLevel_new" USING ("level"::text::"StripeSubscriptionLevel_new");
ALTER TYPE "StripeSubscriptionLevel" RENAME TO "StripeSubscriptionLevel_old";
ALTER TYPE "StripeSubscriptionLevel_new" RENAME TO "StripeSubscriptionLevel";
DROP TYPE "StripeSubscriptionLevel_old";
COMMIT;
