/*
  Warnings:

  - Added the required column `isSubscribed` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "isSubscribed" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "AboutQuestions" (
    "id" "BasicId" NOT NULL DEFAULT 'USER',
    "specialization" TEXT NOT NULL,
    "exciting" TEXT NOT NULL,
    "exp" INTEGER NOT NULL,
    "problems" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "personalIntrests" TEXT NOT NULL,

    CONSTRAINT "AboutQuestions_pkey" PRIMARY KEY ("id")
);
