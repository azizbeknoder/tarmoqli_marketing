-- AlterTable
ALTER TABLE "TakeOff" ALTER COLUMN "currency" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "currency" TEXT;
