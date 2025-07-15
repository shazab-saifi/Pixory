/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_collectionId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "collectionId";

-- AlterTable
CREATE SEQUENCE video_id_seq;
ALTER TABLE "Video" DROP COLUMN "collectionId",
ALTER COLUMN "id" SET DEFAULT nextval('video_id_seq');
ALTER SEQUENCE video_id_seq OWNED BY "Video"."id";

-- CreateTable
CREATE TABLE "CollectionMedia" (
    "id" SERIAL NOT NULL,
    "photoId" INTEGER,
    "videoId" INTEGER,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "CollectionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionMedia_photoId_collectionId_key" ON "CollectionMedia"("photoId", "collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionMedia_videoId_collectionId_key" ON "CollectionMedia"("videoId", "collectionId");

-- AddForeignKey
ALTER TABLE "CollectionMedia" ADD CONSTRAINT "CollectionMedia_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionMedia" ADD CONSTRAINT "CollectionMedia_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionMedia" ADD CONSTRAINT "CollectionMedia_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
