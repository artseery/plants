/*
  Warnings:

  - Made the column `categoryId` on table `Species` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Species" DROP CONSTRAINT "Species_categoryId_fkey";

-- AlterTable
ALTER TABLE "Species" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Species" ADD CONSTRAINT "Species_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
