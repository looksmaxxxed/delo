-- CreateEnum
CREATE TYPE "OrderReportStatus" AS ENUM ('GENERATING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isTermsAccepted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OrderReport" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "status" "OrderReportStatus" NOT NULL DEFAULT 'GENERATING',
    "storageKey" TEXT,
    "confirmedAt" TIMESTAMP(3) NOT NULL,
    "generatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderReport_orderId_createdAt_idx" ON "OrderReport"("orderId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrderReport_orderId_version_key" ON "OrderReport"("orderId", "version");

-- AddForeignKey
ALTER TABLE "OrderReport" ADD CONSTRAINT "OrderReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
