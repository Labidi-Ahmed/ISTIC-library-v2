/*
  Warnings:

  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN "isbn" TEXT;
ALTER TABLE "Book" ADD COLUMN "language" TEXT;
ALTER TABLE "Book" ADD COLUMN "pageCount" INTEGER;
ALTER TABLE "Book" ADD COLUMN "publishedDate" DATETIME;
ALTER TABLE "Book" ADD COLUMN "publisher" TEXT;
ALTER TABLE "Book" ADD COLUMN "rating" REAL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
