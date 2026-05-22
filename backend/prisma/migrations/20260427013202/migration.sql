/*
  Warnings:

  - You are about to drop the column `branch_id` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "branch_id" TEXT;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "branch_id";
