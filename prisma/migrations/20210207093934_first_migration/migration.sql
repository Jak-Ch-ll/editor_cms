-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('BLOGPOST', 'NEWS');

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "preview_text" TEXT,
    "content" JSONB NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article.url_unique" ON "article"("url");
