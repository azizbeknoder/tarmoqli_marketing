-- CreateTable
CREATE TABLE "UserTarif" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),

    CONSTRAINT "UserTarif_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTarif" ADD CONSTRAINT "UserTarif_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTarif" ADD CONSTRAINT "UserTarif_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
