/*
  Warnings:

  - You are about to drop the `diary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "diary";

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'No Title',
    "content" TEXT NOT NULL DEFAULT 'No Content',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);
