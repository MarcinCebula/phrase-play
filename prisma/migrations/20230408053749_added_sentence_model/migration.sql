-- CreateTable
CREATE TABLE "Sentence" (
    "sentenceUID" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "words" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("sentenceUID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sentence_sentenceUID_key" ON "Sentence"("sentenceUID");
