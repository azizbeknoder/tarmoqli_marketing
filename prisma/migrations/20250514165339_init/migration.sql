-- DropForeignKey
ALTER TABLE "referal" DROP CONSTRAINT "referal_referal_user_id_fkey";

-- AlterTable
ALTER TABLE "referal" ALTER COLUMN "referal_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "referal" ADD CONSTRAINT "referal_referal_user_id_fkey" FOREIGN KEY ("referal_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
