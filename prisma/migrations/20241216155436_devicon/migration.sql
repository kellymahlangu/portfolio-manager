-- CreateTable
CREATE TABLE "Devicon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "altnames" TEXT[],
    "tags" TEXT[],
    "color" TEXT NOT NULL,
    "versionsId" INTEGER NOT NULL,
    "isKnown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Devicon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Versions" (
    "id" SERIAL NOT NULL,
    "svg" TEXT[],
    "font" TEXT[],

    CONSTRAINT "Versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alias" (
    "id" SERIAL NOT NULL,
    "base" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "deviconId" INTEGER NOT NULL,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Devicon_name_key" ON "Devicon"("name");

-- AddForeignKey
ALTER TABLE "Devicon" ADD CONSTRAINT "Devicon_versionsId_fkey" FOREIGN KEY ("versionsId") REFERENCES "Versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_deviconId_fkey" FOREIGN KEY ("deviconId") REFERENCES "Devicon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
