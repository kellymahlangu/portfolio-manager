/*
  Warnings:

  - You are about to drop the column `headshot` on the `Basic` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Basic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Basic" DROP COLUMN "headshot",
DROP COLUMN "logo";
