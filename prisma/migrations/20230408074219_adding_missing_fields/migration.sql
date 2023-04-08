/*
  Warnings:

  - Added the required column `pinyin` to the `Sentence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translatedDirection` to the `Sentence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sentence" ADD COLUMN     "pinyin" TEXT NOT NULL,
ADD COLUMN     "translatedDirection" TEXT NOT NULL;
