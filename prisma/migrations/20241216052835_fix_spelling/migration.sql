/*
  Warnings:

  - You are about to drop the column `SummeryVid` on the `Basic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Basic" DROP COLUMN "SummeryVid",
ADD COLUMN     "summeryVid" TEXT NOT NULL DEFAULT 'Nothing here';
