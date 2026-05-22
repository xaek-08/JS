-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_method" TEXT DEFAULT 'COD',
ADD COLUMN     "phone_number" TEXT;
