/*
  Warnings:

  - Added the required column `product_jd` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "product_jd" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "orderProduct" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "isChecked" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "product_jd" INTEGER NOT NULL,
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkedAt" TIMESTAMP(3),

    CONSTRAINT "orderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "main_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
