/*
  Warnings:

  - You are about to drop the column `exciting` on the `AboutQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `AboutQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `personalIntrests` on the `AboutQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `problems` on the `AboutQuestions` table. All the data in the column will be lost.
  - Added the required column `excitement` to the `AboutQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests` to the `AboutQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemsSolved` to the `AboutQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearsOfExperience` to the `AboutQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AboutQuestions" DROP COLUMN "exciting",
DROP COLUMN "exp",
DROP COLUMN "personalIntrests",
DROP COLUMN "problems",
ADD COLUMN     "excitement" TEXT NOT NULL,
ADD COLUMN     "interests" TEXT NOT NULL,
ADD COLUMN     "problemsSolved" TEXT NOT NULL,
ADD COLUMN     "yearsOfExperience" INTEGER NOT NULL;
