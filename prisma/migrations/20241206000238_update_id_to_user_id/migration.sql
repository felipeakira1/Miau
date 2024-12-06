-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_veterinarianId_fkey";

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_veterinarianId_fkey" FOREIGN KEY ("veterinarianId") REFERENCES "veterinarians"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
