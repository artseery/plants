/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Plant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_categoryId_fkey";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "categoryId",
ADD COLUMN     "speciesId" TEXT;

-- CreateTable
CREATE TABLE "Species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Species_slug_key" ON "Species"("slug");

-- AddForeignKey
ALTER TABLE "Species" ADD CONSTRAINT "Species_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE SET NULL ON UPDATE CASCADE;
