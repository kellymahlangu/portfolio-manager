-- CreateEnum
CREATE TYPE "BasicId" AS ENUM ('USER');

-- CreateTable
CREATE TABLE "Basic" (
    "id" "BasicId" NOT NULL DEFAULT 'USER',
    "logo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "mainImg" TEXT NOT NULL,
    "headshot" TEXT NOT NULL,

    CONSTRAINT "Basic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" "BasicId" NOT NULL DEFAULT 'USER',
    "img" TEXT NOT NULL,
    "p1" TEXT NOT NULL,
    "p2" TEXT NOT NULL,
    "p3" TEXT NOT NULL,
    "cv" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
