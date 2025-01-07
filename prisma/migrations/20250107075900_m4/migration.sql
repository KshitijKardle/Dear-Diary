/*
  Warnings:

  - You are about to drop the `blog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "blog";

-- CreateTable
CREATE TABLE "diary" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'No Title',
    "content" TEXT NOT NULL DEFAULT 'No Content',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diary_pkey" PRIMARY KEY ("id")
);
