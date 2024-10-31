/*
  Warnings:

  - You are about to drop the column `address` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `veterinarians` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `veterinarians` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `veterinarians` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `veterinarians` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `veterinarians` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `veterinarians` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `owners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `veterinarians` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `owners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `veterinarians` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'VETERINARIAN', 'ADMIN');

-- DropIndex
DROP INDEX "owners_email_key";

-- DropIndex
DROP INDEX "veterinarians_email_key";

-- AlterTable
ALTER TABLE "owners" DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "veterinarians" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owners_userId_key" ON "owners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "veterinarians_userId_key" ON "veterinarians"("userId");

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veterinarians" ADD CONSTRAINT "veterinarians_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
