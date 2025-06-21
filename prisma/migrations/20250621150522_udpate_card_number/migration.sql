/*
  Warnings:

  - The values [CRYTO] on the enum `CoinType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CoinType_new" AS ENUM ('CRYPTO', 'MONEY');
ALTER TABLE "CardNumber" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Coin" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Coin" ALTER COLUMN "type" TYPE "CoinType_new" USING ("type"::text::"CoinType_new");
ALTER TABLE "CardNumber" ALTER COLUMN "type" TYPE "CoinType_new" USING ("type"::text::"CoinType_new");
ALTER TYPE "CoinType" RENAME TO "CoinType_old";
ALTER TYPE "CoinType_new" RENAME TO "CoinType";
DROP TYPE "CoinType_old";
COMMIT;

-- AlterTable
ALTER TABLE "CardNumber" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Coin" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;
