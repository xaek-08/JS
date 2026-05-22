/*
  Warnings:

  - Added the required column `branch_id` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "branch_id" TEXT NOT NULL;
