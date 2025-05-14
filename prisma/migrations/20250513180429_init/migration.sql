-- AlterTable
ALTER TABLE "referal" ADD COLUMN     "referals" JSONB,
ALTER COLUMN "user_id" SET DEFAULT 0;
