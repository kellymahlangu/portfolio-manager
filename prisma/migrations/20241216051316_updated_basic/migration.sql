/*
  Warnings:

  - You are about to drop the column `mainImg` on the `Basic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Basic" DROP COLUMN "mainImg",
ADD COLUMN     "SummeryVid" TEXT NOT NULL DEFAULT 'Nothing here';
