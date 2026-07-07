-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Species" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
