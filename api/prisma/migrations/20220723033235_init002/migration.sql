/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `JobsOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `JobsOnUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobsOnUsers" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
