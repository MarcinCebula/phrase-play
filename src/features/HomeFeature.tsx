import React, { createContext, useContext, useRef, useState } from "react";
import Word from "~/interfaces/word";
import { api } from "~/utils/api";

function HomeFeature() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowingCard, setIsShowingCard] = useState<boolean>(false);
  const [english, setEnglish] = useState<string>("");
  const [mandarin, setMandarin] = useState<string>("");
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <LanguagePicker />
      <PhraseBox
        setIsLoading={setIsLoading}
        setWords={setWords}
        setIsShowingCard={setIsShowingCard}
      />
      {isLoading && <Loader />}
      {isShowingCard && <Sentances words={words} currentWord={currentWord} />}
      {isShowingCard && (
        <div className="flex w-full flex-col">
          <div className="flex flex-row justify-between">
            <div
              onClick={() => {
                setCurrentWord(currentWord - 1);
              }}
              className="h-12 flex items-center rounded-l-md bg-purple-600 px-6 text-center text-white"
            >
              Previous
            </div>
            <div
              onClick={() => {
                setCurrentWord(currentWord + 1);
              }}
              className="h-12 flex items-center rounded-r-md bg-purple-600 px-6 text-center text-white"
            >
              Next
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const Loader = () => {
  return (
    <div className="flex w-full flex-col py-2">
      <div className="flex h-52 flex-col items-center justify-center rounded-md border border-slate-200 text-center">
        <div className="flex flex-col space-y-2">
          <div className="text-light text-sm capitalize text-slate-500">
            Generating Anki Card...
          </div>
          <progress className="progress w-56"></progress>
        </div>
      </div>
    </div>
  );
};
export const LanguagePicker = () => {
  return (
    <div className="flex flex-col pb-2">
      <span>Mandarin to English</span>
    </div>
  );
};

type PhraseBoxProps = {
  setIsLoading: (state: boolean) => void;
  setWords: (words: any[]) => void;
  setIsShowingCard: (state: boolean) => void;
};
export const PhraseBox = ({
  setIsLoading,
  setWords,
  setIsShowingCard,
}: PhraseBoxProps) => {
  const textBox = useRef<null | HTMLTextAreaElement>(null);
  const mutation = api.example.createAnki.useMutation();

  const onCreateAnkiCard = () => {
    console.log({ textBox: textBox.current });
    mutation.mutate({
      sentence: textBox?.current?.value as string,
      translationDirection: "EnglishToChinese",
    });
  };

  if (mutation.isLoading) {
    setIsLoading(true);
  }
  if (mutation.data) {
    setIsLoading(false);
    setWords(mutation.data.sentence.words as Word[]);
    setIsShowingCard(true);
  }

  return (
    <div className="flex w-full flex-col">
      <textarea
        ref={textBox}
        id="message"
        lang="tw"
        rows={4}
        maxLength={100}
        className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 ring-0 active:ring-0"
        placeholder="Enter the sentence you'd like to translate and practice..."
      ></textarea>
      <button onClick={onCreateAnkiCard} className="h-12 px-12">
        Create Anki Card
      </button>
    </div>
  );
};

type SentancesProps = {
  words: Word[];
  currentWord: number;
};

export const Sentances = ({ words, currentWord }: SentancesProps) => {
  if (words) {
    const word = words[currentWord] as Word;
    return (
      <div className="flex w-full flex-col py-4">
        <div className="flex w-full flex-col items-center justify-between rounded-md border border-slate-200 px-2 py-4 text-center h-52">
          <div className="text-4xl">{word.original}</div>
          <div className="text-1xl">{word.pinyin}</div>
          <div className="flex flex-row">
            {word.translated.map((a) => (
              <div key={a} className="text-lg">
                {a}{",  "}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (words) {
    return <div className="flex flex-col">No Data</div>;
  }
  return <div></div>
};
export default HomeFeature;
