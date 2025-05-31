-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'READY_TO_PAY';

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;
