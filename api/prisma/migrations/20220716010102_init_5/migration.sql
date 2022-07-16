/*
  Warnings:

  - You are about to drop the column `classDateId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `filled` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `timeString` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `ClassDate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filledSlots` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rotaId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volunteersId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassDate" DROP CONSTRAINT "ClassDate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_classDateId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "classDateId",
DROP COLUMN "filled",
DROP COLUMN "timeString",
DROP COLUMN "title",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "filledSlots" INTEGER NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "rotaId" INTEGER NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "volunteersId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "userType" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ClassDate";

-- CreateTable
CREATE TABLE "Rota" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rotaName" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "openSlots" INTEGER NOT NULL,
    "filledSlots" INTEGER NOT NULL,

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rota_rotaName_key" ON "Rota"("rotaName");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_volunteersId_fkey" FOREIGN KEY ("volunteersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_rotaId_fkey" FOREIGN KEY ("rotaId") REFERENCES "Rota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
