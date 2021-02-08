/*
  Warnings:

  - Made the column `title` on table `article` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `preview_text` on table `article` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "article" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT E'',
ALTER COLUMN "preview_text" SET NOT NULL,
ALTER COLUMN "preview_text" SET DEFAULT E'';
