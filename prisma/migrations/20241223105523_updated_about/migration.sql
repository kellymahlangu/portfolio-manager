/*
  Warnings:

  - You are about to drop the column `p1` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `p2` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `p3` on the `About` table. All the data in the column will be lost.
  - Added the required column `paragraph` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "p1",
DROP COLUMN "p2",
DROP COLUMN "p3",
ADD COLUMN     "paragraph" TEXT NOT NULL;
