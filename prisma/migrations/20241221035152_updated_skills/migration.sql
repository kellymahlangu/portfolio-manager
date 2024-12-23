/*
  Warnings:

  - You are about to drop the column `isKnown` on the `Devicon` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `deviconId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Devicon" DROP COLUMN "isKnown";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "icon",
DROP COLUMN "name",
ADD COLUMN     "deviconId" INTEGER NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'FRONTEND';

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_deviconId_fkey" FOREIGN KEY ("deviconId") REFERENCES "Devicon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
